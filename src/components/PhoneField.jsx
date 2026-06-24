import { AsYouType } from 'libphonenumber-js'
import FormIcon from './FormIcon'
import { DEFAULT_PHONE_COUNTRY, getCountryPhoneOptions } from '../data/countryPhoneOptions'
import { formatPhoneE164 } from '../utils/formValidation'

const countryOptions = getCountryPhoneOptions()

function PhoneField({
  id,
  name,
  label,
  required = false,
  country = DEFAULT_PHONE_COUNTRY,
  national = '',
  onCountryChange,
  onNationalChange,
  onBlur,
  error,
}) {
  const formattedNational = national
    ? new AsYouType(country).input(national.replace(/\D/g, ''))
    : ''

  const e164 = formatPhoneE164(country, national)

  return (
    <div className={`modern-field${error ? ' modern-field--error' : ''}`}>
      <span className="modern-field-label" id={`${id}-label`}>
        {label}
        {required && <span className="modern-field-required">*</span>}
      </span>

      <div className="modern-phone-row">
        <div className="modern-field-control modern-phone-country">
          <span className="modern-field-icon" aria-hidden="true">
            <FormIcon name="globe" />
          </span>
          <select
            id={`${id}-country`}
            name={`${name}_country`}
            value={country}
            aria-labelledby={`${id}-label`}
            aria-invalid={error ? 'true' : 'false'}
            onChange={(event) => onCountryChange?.(event.target.value)}
            onBlur={onBlur}
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name} ({option.dialCode})
              </option>
            ))}
          </select>
        </div>

        <div className="modern-field-control modern-field-control--icon modern-phone-number">
          <span className="modern-field-icon" aria-hidden="true">
            <FormIcon name="phone" />
          </span>
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="Phone number"
            value={formattedNational}
            aria-labelledby={`${id}-label`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, '')
              onNationalChange?.(digits)
            }}
            onBlur={onBlur}
          />
        </div>
      </div>

      <input type="hidden" name={name} value={e164} />

      {error ? (
        <p className="modern-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default PhoneField
