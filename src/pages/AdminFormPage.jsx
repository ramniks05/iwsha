import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FIELD_TYPES,
  ICON_OPTIONS,
  SECTION_OPTIONS,
  defaultFields,
  getFormConfig,
  resetFormConfig,
  saveFormConfig,
} from '../data/formConfig'

const BLANK_FIELD = {
  label: '', type: 'text', icon: 'user', placeholder: '',
  required: false, section: 'personal', halfWidth: false, options: '',
}

function AdminFormPage() {
  const [fields, setFields] = useState(() => getFormConfig())
  const [newField, setNewField] = useState(BLANK_FIELD)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('manage')  // 'manage' | 'add'

  // ── Save all ──
  const persist = (updated) => {
    saveFormConfig(updated)
    setFields(updated)
    setSaved(true)
  }

  // ── Toggle enabled ──
  const toggleEnabled = (id) => {
    persist(fields.map((f) => f.id === id ? { ...f, enabled: !f.enabled } : f))
  }

  // ── Toggle required ──
  const toggleRequired = (id) => {
    persist(fields.map((f) => f.id === id ? { ...f, required: !f.required } : f))
  }

  // ── Toggle halfWidth ──
  const toggleHalf = (id) => {
    persist(fields.map((f) => f.id === id ? { ...f, halfWidth: !f.halfWidth } : f))
  }

  // ── Move up / down ──
  const move = (id, dir) => {
    const idx = fields.findIndex((f) => f.id === id)
    if (idx < 0) return
    const next = idx + dir
    if (next < 0 || next >= fields.length) return
    const updated = [...fields]
    ;[updated[idx], updated[next]] = [updated[next], updated[idx]]
    updated.forEach((f, i) => { f.order = i })
    persist(updated)
  }

  // ── Delete custom field ──
  const deleteField = (id) => {
    if (!window.confirm('Remove this field from the form?')) return
    persist(fields.filter((f) => f.id !== id))
  }

  // ── Add new field ──
  const validateNew = () => {
    const e = {}
    if (!newField.label.trim()) e.label = 'Label is required'
    if (newField.type === 'select' && !newField.options.trim()) e.options = 'Add at least one option'
    return e
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const errs = validateNew()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const id = `custom_${newField.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${Date.now()}`
    const added = {
      ...newField,
      id,
      options: newField.type === 'select'
        ? newField.options.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      enabled: true,
      isDefault: false,
      order: fields.length,
    }
    const updated = [...fields, added]
    persist(updated)
    setNewField(BLANK_FIELD)
    setErrors({})
    setActiveTab('manage')
  }

  // ── Reset to defaults ──
  const handleReset = () => {
    if (!window.confirm('Reset form to default fields? All custom fields will be removed.')) return
    resetFormConfig()
    setFields(defaultFields)
    setSaved(true)
  }

  const enabledCount = fields.filter((f) => f.enabled).length

  return (
    <div className="admin-inner-page">
      <div className="admin-inner-header">
        <div>
          <h1>Scholarship Form Builder</h1>
          <p>
            Add, remove and reorder fields. Changes apply live on the scholarship form.
          </p>
        </div>
        <Link to="/scholarships/apply" className="admin-back-btn" target="_blank" rel="noreferrer">
          Preview Form ↗
        </Link>
      </div>

      <div className="admin-body">
        {/* Stats */}
        <div className="fb-stats">
          <div className="fb-stat">
            <strong>{fields.length}</strong>
            <span>Total Fields</span>
          </div>
          <div className="fb-stat fb-stat--green">
            <strong>{enabledCount}</strong>
            <span>Active Fields</span>
          </div>
          <div className="fb-stat fb-stat--muted">
            <strong>{fields.length - enabledCount}</strong>
            <span>Disabled</span>
          </div>
          <div className="fb-stat fb-stat--orange">
            <strong>{fields.filter((f) => !f.isDefault).length}</strong>
            <span>Custom Added</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="fb-tabs">
          <button
            type="button"
            className={`fb-tab ${activeTab === 'manage' ? 'fb-tab--active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h4" strokeLinecap="round"/></svg>
            Manage Fields
          </button>
          <button
            type="button"
            className={`fb-tab ${activeTab === 'add' ? 'fb-tab--active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" strokeLinecap="round"/></svg>
            Add New Field
          </button>
        </div>

        {/* Manage tab */}
        {activeTab === 'manage' && (
          <div className="admin-list-card">
            <div className="fb-list-header">
              <h2 className="admin-section-title" style={{ margin: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h4" strokeLinecap="round"/></svg>
                Form Fields
              </h2>
              <button type="button" className="admin-delete-btn" onClick={handleReset}>
                Reset to Defaults
              </button>
            </div>

            {SECTION_OPTIONS.map((sec) => {
              const secFields = fields
                .map((f, i) => ({ ...f, _idx: i }))
                .filter((f) => f.section === sec.value)
                .sort((a, b) => a.order - b.order)
              if (!secFields.length) return null
              return (
                <div key={sec.value} className="fb-section-group">
                  <div className="fb-section-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" style={{ width: 14, height: 14 }}><circle cx="12" cy="12" r="9"/></svg>
                    {sec.label}
                  </div>
                  {secFields.map((field) => (
                    <FieldRow
                      key={field.id}
                      field={field}
                      allFields={fields}
                      onToggle={toggleEnabled}
                      onToggleRequired={toggleRequired}
                      onToggleHalf={toggleHalf}
                      onMove={move}
                      onDelete={deleteField}
                    />
                  ))}
                </div>
              )
            })}

            {saved && (
              <p className="admin-saved-msg" style={{ marginTop: '1rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Changes saved — refresh the scholarship form to see updates.
              </p>
            )}
          </div>
        )}

        {/* Add tab */}
        {activeTab === 'add' && (
          <div className="admin-form-card">
            <h2 className="admin-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" strokeLinecap="round"/></svg>
              Add New Field
            </h2>

            <form onSubmit={handleAdd} className="admin-form" noValidate>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="nf-label">Field Label *</label>
                  <input
                    id="nf-label" placeholder="e.g. Date of Birth"
                    value={newField.label}
                    onChange={(e) => setNewField((f) => ({ ...f, label: e.target.value }))}
                  />
                  {errors.label && <span className="admin-error">{errors.label}</span>}
                </div>

                <div className="admin-field">
                  <label htmlFor="nf-type">Field Type *</label>
                  <select
                    id="nf-type"
                    value={newField.type}
                    onChange={(e) => setNewField((f) => ({ ...f, type: e.target.value }))}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="nf-section">Section</label>
                  <select
                    id="nf-section"
                    value={newField.section}
                    onChange={(e) => setNewField((f) => ({ ...f, section: e.target.value }))}
                  >
                    {SECTION_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field">
                  <label htmlFor="nf-icon">Icon</label>
                  <select
                    id="nf-icon"
                    value={newField.icon}
                    onChange={(e) => setNewField((f) => ({ ...f, icon: e.target.value }))}
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-field admin-field--full">
                  <label htmlFor="nf-placeholder">Placeholder text</label>
                  <input
                    id="nf-placeholder" placeholder="e.g. Enter your date of birth"
                    value={newField.placeholder}
                    onChange={(e) => setNewField((f) => ({ ...f, placeholder: e.target.value }))}
                  />
                </div>
              </div>

              {newField.type === 'select' && (
                <div className="admin-field">
                  <label htmlFor="nf-options">
                    Options * <span className="admin-field-hint">One option per line</span>
                  </label>
                  <textarea
                    id="nf-options" rows={4}
                    placeholder={"Option A\nOption B\nOption C"}
                    value={newField.options}
                    onChange={(e) => setNewField((f) => ({ ...f, options: e.target.value }))}
                  />
                  {errors.options && <span className="admin-error">{errors.options}</span>}
                </div>
              )}

              <div className="fb-toggle-row">
                <label className="fb-toggle-label">
                  <span>Required field</span>
                  <button
                    type="button"
                    className={`fb-toggle ${newField.required ? 'fb-toggle--on' : ''}`}
                    onClick={() => setNewField((f) => ({ ...f, required: !f.required }))}
                    aria-pressed={newField.required}
                  >
                    <span className="fb-toggle-knob" />
                  </button>
                </label>
                <label className="fb-toggle-label">
                  <span>Half-width (pairs with next)</span>
                  <button
                    type="button"
                    className={`fb-toggle ${newField.halfWidth ? 'fb-toggle--on' : ''}`}
                    onClick={() => setNewField((f) => ({ ...f, halfWidth: !f.halfWidth }))}
                    aria-pressed={newField.halfWidth}
                  >
                    <span className="fb-toggle-knob" />
                  </button>
                </label>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-submit-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8" strokeLinecap="round"/></svg>
                  Add Field to Form
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Field row component ──
function FieldRow({ field, allFields, onToggle, onToggleRequired, onToggleHalf, onMove, onDelete }) {
  const isFirst = field.order === 0
  const isLast = field.order === allFields.length - 1

  return (
    <div className={`fb-field-row ${field.enabled ? '' : 'fb-field-row--disabled'}`}>
      {/* Drag handle / order arrows */}
      <div className="fb-field-order">
        <button
          type="button" className="fb-order-btn"
          onClick={() => onMove(field.id, -1)}
          disabled={isFirst} aria-label="Move up"
        >▲</button>
        <button
          type="button" className="fb-order-btn"
          onClick={() => onMove(field.id, 1)}
          disabled={isLast} aria-label="Move down"
        >▼</button>
      </div>

      {/* Info */}
      <div className="fb-field-info">
        <span className="fb-field-name">
          {field.label}
          {!field.isDefault && <span className="admin-custom-tag">Custom</span>}
        </span>
        <div className="fb-field-meta">
          <span className="fb-meta-chip fb-meta-chip--type">{field.type}</span>
          <span className="fb-meta-chip fb-meta-chip--section">
            {SECTION_OPTIONS.find((s) => s.value === field.section)?.label || field.section}
          </span>
          {field.required && <span className="fb-meta-chip fb-meta-chip--req">Required</span>}
          {field.halfWidth && <span className="fb-meta-chip fb-meta-chip--half">½ width</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="fb-field-controls">
        <label className="fb-mini-toggle" title={field.required ? 'Required' : 'Optional'}>
          <span className="fb-mini-toggle-label">Req</span>
          <button
            type="button"
            className={`fb-toggle fb-toggle--sm ${field.required ? 'fb-toggle--on' : ''}`}
            onClick={() => onToggleRequired(field.id)}
            aria-pressed={field.required}
          >
            <span className="fb-toggle-knob" />
          </button>
        </label>

        <label className="fb-mini-toggle" title="Half-width">
          <span className="fb-mini-toggle-label">½</span>
          <button
            type="button"
            className={`fb-toggle fb-toggle--sm ${field.halfWidth ? 'fb-toggle--on' : ''}`}
            onClick={() => onToggleHalf(field.id)}
            aria-pressed={field.halfWidth}
          >
            <span className="fb-toggle-knob" />
          </button>
        </label>

        <label className="fb-mini-toggle" title={field.enabled ? 'Enabled — click to disable' : 'Disabled — click to enable'}>
          <span className="fb-mini-toggle-label">{field.enabled ? 'On' : 'Off'}</span>
          <button
            type="button"
            className={`fb-toggle fb-toggle--sm ${field.enabled ? 'fb-toggle--on' : ''}`}
            onClick={() => onToggle(field.id)}
            aria-pressed={field.enabled}
          >
            <span className="fb-toggle-knob" />
          </button>
        </label>

        {!field.isDefault && (
          <button
            type="button"
            className="admin-delete-btn"
            style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
            onClick={() => onDelete(field.id)}
            aria-label={`Delete ${field.label}`}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default AdminFormPage
