import {
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js'

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const NAME_PATTERN = /^[\p{L}\s.'-]+$/u

const FIELD_RULES = {
  studentName: {
    minLength: 2,
    maxLength: 100,
    pattern: NAME_PATTERN,
    label: 'Student name',
  },
  age: { min: 10, max: 100, label: 'Age' },
  guardian: {
    minLength: 2,
    maxLength: 100,
    pattern: NAME_PATTERN,
    label: 'Guardian name',
  },
  income: { min: 0, max: 99999999999, label: 'Family annual income' },
  reason: { minLength: 20, maxLength: 2000, label: 'Support reason' },
}

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length > 254) return false
  return EMAIL_PATTERN.test(trimmed)
}

export function validateEmailField(value, required = true) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) {
    return required ? 'Email is required' : ''
  }
  if (!isValidEmail(trimmed)) {
    return 'Enter a valid email address (e.g. you@email.com)'
  }
  return ''
}

export function validatePhoneField(country, nationalNumber, required = true) {
  const digits = String(nationalNumber ?? '').replace(/\D/g, '')

  if (!digits) {
    return required ? 'Phone number is required' : ''
  }

  try {
    const callingCode = getCountryCallingCode(country)
    const full = `+${callingCode}${digits}`

    if (!isValidPhoneNumber(full)) {
      return 'Enter a valid phone number for the selected country'
    }

    return ''
  } catch {
    return 'Enter a valid phone number'
  }
}

export function formatPhoneE164(country, nationalNumber) {
  const digits = String(nationalNumber ?? '').replace(/\D/g, '')
  if (!digits) return ''

  try {
    const callingCode = getCountryCallingCode(country)
    const parsed = parsePhoneNumber(`+${callingCode}${digits}`)
    return parsed?.format('E.164') ?? ''
  } catch {
    return ''
  }
}

function validateTextField(value, field, rules = {}) {
  const trimmed = String(value ?? '').trim()
  const label = rules.label || field.label

  if (!trimmed) {
    return field.required ? `${label} is required` : ''
  }

  if (rules.minLength && trimmed.length < rules.minLength) {
    return `${label} must be at least ${rules.minLength} characters`
  }

  if (rules.maxLength && trimmed.length > rules.maxLength) {
    return `${label} must be at most ${rules.maxLength} characters`
  }

  if (rules.pattern && !rules.pattern.test(trimmed)) {
    return `Enter a valid ${label.toLowerCase()}`
  }

  return ''
}

function validateNumberField(value, field, rules = {}) {
  const raw = String(value ?? '').trim()
  const label = rules.label || field.label

  if (!raw) {
    return field.required ? `${label} is required` : ''
  }

  const num = Number(raw)
  if (!Number.isFinite(num)) {
    return `${label} must be a valid number`
  }

  if (rules.min !== undefined && num < rules.min) {
    return `${label} must be at least ${rules.min}`
  }

  if (rules.max !== undefined && num > rules.max) {
    return `${label} must be at most ${rules.max.toLocaleString('en-IN')}`
  }

  if (field.id === 'age' && !Number.isInteger(num)) {
    return 'Age must be a whole number'
  }

  if (field.id === 'income' && num < 0) {
    return 'Income cannot be negative'
  }

  return ''
}

function validateSelectField(value, field) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed && field.required) {
    return `Please select ${field.label.toLowerCase()}`
  }
  return ''
}

function validateTextareaField(value, field, rules = {}) {
  return validateTextField(value, field, {
    minLength: rules.minLength ?? (field.required ? 10 : 0),
    maxLength: rules.maxLength ?? 2000,
    label: rules.label || field.label,
  })
}

export function validateDynamicField(field, value, phoneState) {
  if (field.enabled === false) return ''

  if (field.type === 'tel') {
    const state = phoneState?.[field.id] ?? phoneState
    if (!state?.country) {
      return field.required ? 'Phone number is required' : ''
    }
    return validatePhoneField(state.country, state.national, field.required)
  }

  if (field.type === 'email') {
    return validateEmailField(value, field.required)
  }

  if (field.type === 'select') {
    return validateSelectField(value, field)
  }

  if (field.type === 'number') {
    return validateNumberField(value, field, FIELD_RULES[field.id] ?? {})
  }

  if (field.type === 'textarea') {
    return validateTextareaField(value, field, FIELD_RULES[field.id] ?? {})
  }

  const rules = FIELD_RULES[field.id] ?? {
    minLength: field.required ? 1 : 0,
    maxLength: 500,
    label: field.label,
  }

  return validateTextField(value, field, rules)
}

export function validateScholarshipForm(fields, formData, phoneValues, consentChecked) {
  const errors = {}

  fields.forEach((field) => {
    const value = formData.get(field.id)
    const error = validateDynamicField(field, value, phoneValues)
    if (error) errors[field.id] = error
  })

  if (!consentChecked) {
    errors.consent = 'You must agree to be contacted regarding your application'
  }

  return errors
}

export function validateDonationForm({ name, email, phoneCountry, phoneNational, amount, message }) {
  const errors = {}

  const nameError = validateTextField(
    name,
    { required: true, label: 'Full name' },
    { minLength: 2, maxLength: 100, pattern: NAME_PATTERN, label: 'Full name' },
  )
  if (nameError) errors.name = nameError

  const emailError = validateEmailField(email, true)
  if (emailError) errors.email = emailError

  const phoneError = validatePhoneField(phoneCountry, phoneNational, true)
  if (phoneError) errors.phone = phoneError

  const amountRaw = String(amount ?? '').trim()
  if (!amountRaw) {
    errors.amount = 'Donation amount is required'
  } else {
    const num = Number(amountRaw)
    if (!Number.isFinite(num) || num <= 0) {
      errors.amount = 'Enter a valid donation amount greater than zero'
    } else if (!Number.isInteger(num)) {
      errors.amount = 'Amount must be a whole number (INR)'
    } else if (num > 99999999) {
      errors.amount = 'Amount exceeds the maximum allowed limit'
    }
  }

  if (message?.trim()) {
    const messageError = validateTextField(
      message,
      { required: false, label: 'Message' },
      { maxLength: 500, label: 'Message' },
    )
    if (messageError) errors.message = messageError
  }

  return errors
}

export function validateContactForm({ name, email, phoneCountry, phoneNational, subject, message }) {
  const errors = {}

  const nameError = validateTextField(
    name,
    { required: true, label: 'Full name' },
    { minLength: 2, maxLength: 100, pattern: NAME_PATTERN, label: 'Full name' },
  )
  if (nameError) errors.name = nameError

  const emailError = validateEmailField(email, true)
  if (emailError) errors.email = emailError

  if (phoneNational?.trim()) {
    const phoneError = validatePhoneField(phoneCountry, phoneNational, false)
    if (phoneError) errors.phone = phoneError
  }

  if (subject?.trim()) {
    const subjectError = validateTextField(
      subject,
      { required: false, label: 'Subject' },
      { maxLength: 200, label: 'Subject' },
    )
    if (subjectError) errors.subject = subjectError
  }

  const messageError = validateTextField(
    message,
    { required: true, label: 'Message' },
    { minLength: 10, maxLength: 2000, label: 'Message' },
  )
  if (messageError) errors.message = messageError

  return errors
}
