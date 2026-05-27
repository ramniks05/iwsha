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
  children,
}) {
  return (
    <label className="modern-field" htmlFor={name}>
      <span className="modern-field-label">
        {label}
        {required && <span className="modern-field-required">*</span>}
      </span>
      <div className={`modern-field-control${icon ? ' modern-field-control--icon' : ''}`}>
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
            required={required}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </label>
  )
}

export default FormField
