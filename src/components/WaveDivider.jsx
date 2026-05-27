import { useEffect, useRef } from 'react'

const floatIcons = ['🎓', '📖', '✨', '🌍']

function WaveDivider() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('wave-divider--visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="wave-divider" ref={sectionRef} aria-label="Inspirational quote">
      <div className="wave-divider-wrap">
        <svg
          className="wave-divider-shape"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveDividerFill" x1="0" y1="0" x2="1440" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="45%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f4f6f9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveDividerFill)"
            d="M0,20 C240,0 480,34 720,18 C960,2 1200,30 1440,16 L1440,84 C1200,102 960,70 720,86 C480,102 240,74 0,86 Z"
          />
        </svg>

        {floatIcons.map((icon, index) => (
          <span
            key={icon}
            className="wave-divider-float"
            aria-hidden="true"
            style={{ '--float-delay': `${index * 0.7}s`, '--float-x': `${14 + index * 24}%` }}
          >
            {icon}
          </span>
        ))}

        <div className="wave-divider-content">
          <span className="wave-divider-mark" aria-hidden="true">“</span>
          <blockquote>
            <p>Education is the foundation of empowerment and change.</p>
          </blockquote>
          <cite>IWSHA FOUNDATION</cite>
        </div>
      </div>
    </section>
  )
}

export default WaveDivider
