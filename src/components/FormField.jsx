import FormIcon from './FormIcon'

function FormField({
  label,
  name,
  icon,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  onBlur,
  error,
  children,
  min,
  max,
  inputMode,
  autoComplete,
}) {
  const controlClass = [
    'modern-field-control',
    icon ? 'modern-field-control--icon' : '',
    error ? 'modern-field-control--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={`modern-field${error ? ' modern-field--error' : ''}`} htmlFor={name}>
      <span className="modern-field-label">
        {label}
        {required && <span className="modern-field-required">*</span>}
      </span>
      <div className={controlClass}>
        {icon && (
          <span className="modern-field-icon" aria-hidden="true">
            <FormIcon name={icon} />
          </span>
        )}
        {children ?? (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
            inputMode={inputMode}
            autoComplete={autoComplete}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      </div>
      {error ? (
        <p className="modern-field-error" id={`${name}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </label>
  )
}

export default FormField
