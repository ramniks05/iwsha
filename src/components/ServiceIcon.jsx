const icons = {
  scholarship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 3L2 8l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 8v6" strokeLinecap="round" />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 20h8M12 18v2" strokeLinecap="round" />
      <path d="M8 9h8M8 13h5" strokeLinecap="round" />
    </svg>
  ),
  digital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M8 19h8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinejoin="round" />
      <path d="M8 9V7a4 4 0 018 0v2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v2" strokeLinecap="round" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 2l2.4 4.8L20 8l-3.8 3.2L17.2 16 12 13.6 6.8 16l1-4.8L4 8l5.6-1.2L12 2z" strokeLinejoin="round" />
    </svg>
  ),
  girls: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-1a6 6 0 0112 0v1" strokeLinecap="round" />
      <path d="M12 12v3" strokeLinecap="round" />
    </svg>
  ),
  exams: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M6 4h12a2 2 0 012 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 012-2z" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6" strokeLinecap="round" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round" />
      <path d="M15 19c0-1.8 1.5-3.2 3.5-3.5" strokeLinecap="round" />
    </svg>
  ),
  library: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14" strokeLinejoin="round" />
      <path d="M4 19h16M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
    </svg>
  ),
  mentorship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 3a5 5 0 015 5c0 2.5-1.5 4-3 5.5V17H10v-3.5C8.5 12 7 10.5 7 8a5 5 0 015-5z" strokeLinejoin="round" />
      <path d="M9 21h6" strokeLinecap="round" />
    </svg>
  ),
}

function ServiceIcon({ name }) {
  return icons[name] || icons.scholarship
}

export default ServiceIcon
