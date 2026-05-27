import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AboutIcon from './AboutIcon'
import { aboutHighlights } from '../data/aboutContent'
import { images } from '../data/images'
import { organization } from '../data/siteConfig'

function AboutSection() {
  const sectionRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(images.library)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reveal = (el) => el.classList.add('about-animate--visible')

    const targets = section.querySelectorAll('.about-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    )

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      if (inView) {
        reveal(el)
      } else {
        observer.observe(el)
      }
    })

    const fallback = window.setTimeout(() => {
      targets.forEach(reveal)
    }, 1000)

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="about-premium" id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="about-premium-bg" aria-hidden="true">
        <span className="about-float about-float--1" />
        <span className="about-float about-float--2" />
        <span className="about-float about-float--3" />
      </div>

      <div className="about-premium-inner">
        <div className="about-premium-visual about-animate">
          <div className="about-premium-image-wrap">
            <img
              src={imageSrc}
              alt="Students learning together with teacher mentorship in a community education setting"
              onError={() => setImageSrc(images.welfare)}
            />
            <div className="about-premium-image-overlay" aria-hidden="true" />
            <div className="about-premium-image-badge">
              <span className="about-badge-icon" aria-hidden="true">🎓</span>
              <div>
                <strong>500+</strong>
                <span>Students Empowered</span>
              </div>
            </div>
          </div>
          <div className="about-premium-image-accent" aria-hidden="true" />
        </div>

        <div className="about-premium-content">
          <span className="about-premium-label about-animate">About Our Mission</span>

          <h2 id="about-heading" className="about-premium-title about-animate">
            Who We Are
          </h2>

          <p className="about-premium-lead about-animate">
            {organization.aboutDescription}
          </p>

          <ul className="about-highlights">
            {aboutHighlights.map((item, index) => (
              <li
                className="about-highlight about-animate"
                key={item.id}
                style={{ '--about-delay': `${0.08 + index * 0.1}s` }}
              >
                <span className="about-highlight-icon" aria-hidden="true">
                  <AboutIcon name={item.icon} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link to="/programs" className="about-premium-cta about-animate">
            Learn More
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
