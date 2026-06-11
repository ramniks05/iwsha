// ── Scholarship Form — Dynamic Field Configuration ──
// Each field has a stable `id` used as the HTML name attribute.
// Admin can toggle enabled, reorder, or add custom fields.
// When PHP backend is ready, this config can be fetched from the API
// and saved back via POST /api/form-config  (replace localStorage calls).

export const FORM_CONFIG_KEY = 'iwsha_form_config'

export const FIELD_TYPES = ['text', 'number', 'email', 'tel', 'select', 'textarea']

export const SECTION_OPTIONS = [
  { value: 'personal',   label: 'Personal Details',  icon: 'user' },
  { value: 'education',  label: 'Education Details',  icon: 'education' },
  { value: 'support',    label: 'Support Request',    icon: 'message' },
]

export const ICON_OPTIONS = [
  'user', 'users', 'phone', 'mail', 'age', 'education',
  'globe', 'rupee', 'message', 'scholarship', 'check',
]

// ── Default fields (cannot be permanently deleted — only disabled) ──
export const defaultFields = [
  // ── Personal ──
  {
    id: 'studentName', label: 'Student Name', type: 'text',
    icon: 'user', placeholder: 'Full name', required: true,
    section: 'personal', halfWidth: true, enabled: true, isDefault: true, order: 0,
  },
  {
    id: 'age', label: 'Age', type: 'number',
    icon: 'age', placeholder: '17', required: true,
    section: 'personal', halfWidth: true, enabled: true, isDefault: true, order: 1,
  },
  {
    id: 'guardian', label: 'Guardian Name', type: 'text',
    icon: 'users', placeholder: 'Parent / guardian', required: true,
    section: 'personal', halfWidth: true, enabled: true, isDefault: true, order: 2,
  },
  {
    id: 'phone', label: 'Phone', type: 'tel',
    icon: 'phone', placeholder: '+91 98765 43210', required: true,
    section: 'personal', halfWidth: true, enabled: true, isDefault: true, order: 3,
  },
  {
    id: 'email', label: 'Email', type: 'email',
    icon: 'mail', placeholder: 'you@email.com', required: true,
    section: 'personal', halfWidth: false, enabled: true, isDefault: true, order: 4,
  },
  // ── Education ──
  {
    id: 'education', label: 'Education Level', type: 'select',
    icon: 'education', placeholder: 'Select level', required: true,
    options: ['10th Standard', '12th Standard', 'Graduate', 'Post Graduate'],
    section: 'education', halfWidth: true, enabled: true, isDefault: true, order: 5,
  },
  {
    id: 'destination', label: 'Preferred Destination', type: 'select',
    icon: 'globe', placeholder: 'Select country', required: true,
    options: ['Switzerland', 'Italy', 'Canada', 'California', 'Belgium', 'Indian University'],
    section: 'education', halfWidth: true, enabled: true, isDefault: true, order: 6,
  },
  {
    id: 'income', label: 'Family Annual Income (INR)', type: 'number',
    icon: 'rupee', placeholder: '250000', required: true,
    section: 'education', halfWidth: false, enabled: true, isDefault: true, order: 7,
  },
  // ── Support ──
  {
    id: 'reason', label: 'Why do you need support?', type: 'textarea',
    icon: 'message', placeholder: 'Briefly describe your education goals...', required: true,
    section: 'support', halfWidth: false, enabled: true, isDefault: true, order: 8,
  },
]

// ── Helpers ──

/** Returns merged config: defaults patched with any admin overrides */
export function getFormConfig() {
  try {
    const raw = localStorage.getItem(FORM_CONFIG_KEY)
    if (!raw) return defaultFields

    const saved = JSON.parse(raw)  // array of all fields (defaults + custom)
    return saved
  } catch {
    return defaultFields
  }
}

/** Persist the full fields array */
export function saveFormConfig(fields) {
  localStorage.setItem(FORM_CONFIG_KEY, JSON.stringify(fields))
}

/** Reset to defaults */
export function resetFormConfig() {
  localStorage.removeItem(FORM_CONFIG_KEY)
}
