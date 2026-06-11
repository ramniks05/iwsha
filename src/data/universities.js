import { images } from './images'

export const STORAGE_KEY = 'iwsha_universities'

export const defaultUniversities = [
  {
    id: 'eth-zurich',
    slug: 'eth-zurich',
    name: 'ETH Zurich Outreach Programs',
    shortName: 'ETH Zurich',
    location: 'Zurich, Switzerland',
    country: 'Switzerland',
    countryCode: 'CH',
    image: images.university,
    tagline: 'World-class engineering and research — open to deserving students globally.',
    overview:
      'ETH Zurich is consistently ranked among the top universities in the world for engineering, science, and technology. IWSHA Foundation collaborates with outreach programs to help underprivileged Indian students access merit-based scholarships and application support for Bachelor\'s and Master\'s programs.',
    programs: [
      'BSc / MSc Computer Science',
      'BSc / MSc Electrical Engineering',
      'BSc / MSc Mechanical Engineering',
      'MSc Robotics & Autonomous Systems',
      'MSc Data Science',
    ],
    highlights: [
      { icon: '🏆', label: 'World Rank', value: 'Top 10' },
      { icon: '📚', label: 'Programs', value: '20+ Tracks' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹5L' },
      { icon: '🕐', label: 'Duration', value: '3–4 Years' },
    ],
    requirements: [
      'Minimum 85% in 10+2 (Science stream)',
      'English proficiency — IELTS 7.0+ or equivalent',
      'Statement of Purpose (500–700 words)',
      'Two academic recommendation letters',
      'Proof of financial need',
    ],
    fees: 'CHF 730 / semester (~₹68,000) — subsidized through IWSHA aid',
    deadline: 'December 15 (for next academic year)',
    website: 'https://ethz.ch',
    applyLink: '/scholarships/apply',
  },
  {
    id: 'unibo',
    slug: 'unibo',
    name: 'University of Bologna Pathways',
    shortName: 'Unibo',
    location: 'Bologna, Italy',
    country: 'Italy',
    countryCode: 'IT',
    image: images.italy,
    tagline: 'The world\'s oldest university, open to students from every background.',
    overview:
      'Founded in 1088, the University of Bologna offers a rich academic tradition across arts, medicine, law, and social sciences. IWSHA works with its international office to support Indian students applying for undergraduate and postgraduate programs, including fee waiver tracks for economically weaker sections.',
    programs: [
      'BSc / MSc Fine Arts & Design',
      'MBBS / Medicine (English-medium)',
      'LLM International Law',
      'MA Cultural Heritage & Tourism',
      'MSc Biomedical Engineering',
    ],
    highlights: [
      { icon: '🏛️', label: 'Est.', value: '1088 AD' },
      { icon: '📚', label: 'Programs', value: '30+ Tracks' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹4L' },
      { icon: '🕐', label: 'Duration', value: '3–5 Years' },
    ],
    requirements: [
      'Minimum 75% in Higher Secondary',
      'IELTS 6.5+ or TOEFL 80+',
      'Portfolio (for design/arts programs)',
      'Motivation letter and CV',
      'NEET score (for medicine track)',
    ],
    fees: '€2,600–€3,200 / year — partial fee waiver available via IWSHA',
    deadline: 'March 31 (UNIBO early) / June 30 (general)',
    website: 'https://www.unibo.it',
    applyLink: '/scholarships/apply',
  },
  {
    id: 'uoft',
    slug: 'uoft',
    name: 'University of Toronto Access Desk',
    shortName: 'U of T',
    location: 'Toronto, Canada',
    country: 'Canada',
    countryCode: 'CA',
    image: images.canada,
    tagline: 'North America\'s top-ranked university with strong scholarship pathways for Indian students.',
    overview:
      'The University of Toronto is ranked among the top 25 universities worldwide. IWSHA\'s Access Desk initiative provides counseling, scholarship guidance, and pre-application preparation specifically for Indian students from low-income families seeking admission to Canada\'s most prestigious institution.',
    programs: [
      'BSc Computer Science',
      'BSc Nursing & Health Sciences',
      'BBA / MBA',
      'MSc Artificial Intelligence',
      'MSc Public Policy',
    ],
    highlights: [
      { icon: '🌍', label: 'World Rank', value: 'Top 25' },
      { icon: '📚', label: 'Programs', value: '700+ Tracks' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹8L' },
      { icon: '🕐', label: 'Duration', value: '3–4 Years' },
    ],
    requirements: [
      'Minimum 80% in 12th standard',
      'IELTS 6.5+ (no band below 6.0)',
      'SAT / ACT score (for undergrad)',
      'Statement of purpose and personal essay',
      'Demonstrated financial need documents',
    ],
    fees: 'CAD 6,100–7,500 / year — IWSHA negotiated bursary tracks',
    deadline: 'January 14 (Winter intake) / November (Fall intake)',
    website: 'https://www.utoronto.ca',
    applyLink: '/scholarships/apply',
  },
  {
    id: 'cal-hub',
    slug: 'cal-hub',
    name: 'California International Learner Hub',
    shortName: 'CA Hub',
    location: 'California, USA',
    country: 'California, USA',
    countryCode: 'US',
    image: images.california,
    tagline: 'Silicon Valley\'s doorstep — technology, creativity, and entrepreneurship.',
    overview:
      'The California International Learner Hub aggregates admission support across UC system colleges including UC Berkeley, UCLA, and UC San Diego. IWSHA helps students navigate the Common App process, secure fee waivers, and access California Dream Act benefits for deserving applicants.',
    programs: [
      'BSc Electrical Engineering & CS (EECS)',
      'BSc Film, Television & Digital Media',
      'MSc Technology Management',
      'BSc Environmental Science',
      'MBA with Entrepreneurship Focus',
    ],
    highlights: [
      { icon: '💡', label: 'Innovation', value: 'Silicon Valley' },
      { icon: '📚', label: 'Campuses', value: '10 UC Colleges' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹10L' },
      { icon: '🕐', label: 'Duration', value: '4 Years' },
    ],
    requirements: [
      'GPA equivalent 3.5+ / 90% in 12th',
      'IELTS 7.0+ or TOEFL 100+',
      'SAT 1350+ recommended',
      '2 short essays via Common App',
      'Extracurricular achievements documentation',
    ],
    fees: 'USD 11,500–14,000 / year — fee-aid packages available for IWSHA students',
    deadline: 'November 30 (UC system deadline)',
    website: 'https://www.universityofcalifornia.edu',
    applyLink: '/scholarships/apply',
  },
  {
    id: 'ku-leuven',
    slug: 'ku-leuven',
    name: 'KU Leuven Collaboration Desk',
    shortName: 'KU Leuven',
    location: 'Leuven, Belgium',
    country: 'Belgium',
    countryCode: 'BE',
    image: images.belgium,
    tagline: 'Europe\'s leading research university, rich in interdisciplinary learning.',
    overview:
      'KU Leuven ranks among the most innovative universities in Europe. IWSHA\'s Collaboration Desk offers structured mentoring and pre-screening support for Indian students interested in biotechnology, engineering, and humanities programs. A strong focus on research-based learning makes this ideal for academically driven students.',
    programs: [
      'MSc Biotechnology',
      'MSc Civil Engineering',
      'MA Philosophy & Ethics',
      'MSc Bioinformatics',
      'MSc Advanced Manufacturing',
    ],
    highlights: [
      { icon: '🔬', label: 'Research', value: '#1 in Europe' },
      { icon: '📚', label: 'Programs', value: '350+ Tracks' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹6L' },
      { icon: '🕐', label: 'Duration', value: '1–2 Years (PG)' },
    ],
    requirements: [
      'BSc degree with 70%+ marks',
      'IELTS 6.5+ or Dutch B2 (for some tracks)',
      'Research proposal / motivation letter',
      'Academic transcript and diploma copy',
      'Professor recommendation letter',
    ],
    fees: '€906 / year (EU rate via IWSHA channels)',
    deadline: 'March 1 (most programs)',
    website: 'https://www.kuleuven.be',
    applyLink: '/scholarships/apply',
  },
  {
    id: 'indian-assist',
    slug: 'indian-assist',
    name: 'Indian University Assistance Program',
    shortName: 'IU Assist',
    location: 'Pan-India',
    country: 'India',
    countryCode: 'IN',
    image: images.indiaUniversity,
    tagline: 'Dedicated counseling and fee support for top Indian universities.',
    overview:
      'IWSHA Foundation\'s Indian University Assistance Program provides counseling, application support, and fee assistance for admissions to IITs, NITs, AIIMS, IIMs, and state universities. Special emphasis is placed on students from EWS and OBC backgrounds who need guidance beyond what school counselors can offer.',
    programs: [
      'IIT / NIT B.Tech Programs',
      'AIIMS MBBS & BSc Nursing',
      'IIM MBA / PGDM',
      'State University BCA / MCA',
      'Central University Arts & Humanities',
    ],
    highlights: [
      { icon: '🇮🇳', label: 'Coverage', value: 'Pan-India' },
      { icon: '📚', label: 'Institutions', value: 'IITs, NITs, AIIMS' },
      { icon: '💰', label: 'IWSHA Aid', value: 'Up to ₹2L' },
      { icon: '🕐', label: 'Support', value: 'Year-round' },
    ],
    requirements: [
      'Valid JEE / NEET / CAT score (as applicable)',
      'Class 10 & 12 mark sheets',
      'Caste / EWS certificate (if applicable)',
      'Income certificate (family annual income)',
      'Aadhar and domicile documents',
    ],
    fees: 'Based on institution — IWSHA covers gap funding and application fees',
    deadline: 'Varies by institution — contact IWSHA team for current cycles',
    website: '/contact',
    applyLink: '/scholarships/apply',
  },
]

export function getUniversities() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const extra = JSON.parse(stored)
      return [...defaultUniversities, ...extra]
    }
  } catch {
    // ignore
  }
  return defaultUniversities
}

export function saveUniversity(uni) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const extra = stored ? JSON.parse(stored) : []
    extra.push(uni)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extra))
  } catch {
    // ignore
  }
}

export function deleteUniversity(id) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    const extra = JSON.parse(stored).filter((u) => u.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extra))
  } catch {
    // ignore
  }
}
