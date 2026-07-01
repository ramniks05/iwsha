// ── Scholarship Application — Fixed Form Fields ──
// Fields are not configurable from admin. Update here when requirements change.

export const SECTION_OPTIONS = [
  { value: 'personal', label: 'Personal Details', icon: 'user' },
  { value: 'education', label: 'Education Details', icon: 'education' },
  { value: 'support', label: 'Support Request', icon: 'message' },
]

export const SCHOLARSHIP_FIELDS = [
  {
    id: 'studentName', label: 'Student Name', type: 'text',
    icon: 'user', placeholder: 'Full name', required: true,
    section: 'personal', halfWidth: true, order: 0,
  },
  {
    id: 'age', label: 'Age', type: 'number',
    icon: 'age', placeholder: '17', required: true,
    section: 'personal', halfWidth: true, order: 1,
  },
  {
    id: 'guardian', label: 'Guardian Name', type: 'text',
    icon: 'users', placeholder: 'Parent / guardian', required: true,
    section: 'personal', halfWidth: true, order: 2,
  },
  {
    id: 'phone', label: 'Phone', type: 'tel',
    icon: 'phone', placeholder: '+91 98765 43210', required: true,
    section: 'personal', halfWidth: true, order: 3,
  },
  {
    id: 'email', label: 'Email', type: 'email',
    icon: 'mail', placeholder: 'you@email.com', required: true,
    section: 'personal', halfWidth: false, order: 4,
  },
  {
    id: 'education', label: 'Education Level', type: 'select',
    icon: 'education', placeholder: 'Select level', required: true,
    options: ['10th Standard', '12th Standard', 'Graduate', 'Post Graduate'],
    section: 'education', halfWidth: true, order: 5,
  },
  {
    id: 'destination', label: 'Preferred Destination', type: 'select',
    icon: 'globe', placeholder: 'Select country', required: true,
    options: ['Switzerland', 'Italy', 'Canada', 'California', 'Belgium', 'Indian University'],
    section: 'education', halfWidth: true, order: 6,
  },
  {
    id: 'income', label: 'Family Annual Income (INR)', type: 'number',
    icon: 'rupee', placeholder: '250000', required: true,
    section: 'education', halfWidth: false, order: 7,
  },
  {
    id: 'reason', label: 'Why do you need support?', type: 'textarea',
    icon: 'message', placeholder: 'Briefly describe your education goals...', required: true,
    section: 'support', halfWidth: false, order: 8,
  },
]

/** @deprecated Use SCHOLARSHIP_FIELDS directly */
export function getFormConfig() {
  return SCHOLARSHIP_FIELDS
}
