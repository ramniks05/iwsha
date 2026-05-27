const icons = {
  empower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16.5 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3z" strokeLinejoin="round" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M8 19h8M12 17v2" strokeLinecap="round" />
      <path d="M7 10h4M7 13h6" strokeLinecap="round" />
    </svg>
  ),
  scholarship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 3L2 8l10 5 10-5-10-5z" strokeLinejoin="round" />
      <path d="M6 11v4c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5v-4" strokeLinecap="round" strokeLinejoin="round" />
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
}

function AboutIcon({ name }) {
  return icons[name] || icons.empower
}

export default AboutIcon
