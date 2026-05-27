import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceIcon from './ServiceIcon'
import {
  welfareImpactStats,
  welfareServices,
  welfareTimeline,
} from '../data/welfareServices'

function useCountUp(target, active, duration = 1400) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let frameId = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(target * eased))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [target, active, duration])

  return count
}

function ImpactStat({ stat, active, delay }) {
  const count = useCountUp(stat.value, active)

  return (
    <div className="ewp-stat" style={{ '--ewp-delay': `${delay}s` }}>
      <strong>
        {count.toLocaleString()}
        {stat.suffix}
      </strong>
      <span>{stat.label}</span>
    </div>
  )
}

function ServicesSection() {
  const sectionRef = useRef(null)
  const [countersActive, setCountersActive] = useState(false)
  const [timelineActive, setTimelineActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const cards = section.querySelectorAll('.ewp-card')
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ewp-card--visible')
            cardObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )

    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersActive(true)
          setTimelineActive(true)
          statsObserver.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    cards.forEach((card) => cardObserver.observe(card))
    const statsEl = section.querySelector('.ewp-impact')
    if (statsEl) statsObserver.observe(statsEl)

    return () => {
      cardObserver.disconnect()
      statsObserver.disconnect()
    }
  }, [])

  return (
    <section className="ewp-services" ref={sectionRef} aria-labelledby="ewp-services-heading">
      <div className="ewp-wave ewp-wave--top" aria-hidden="true">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0,32 C360,0 720,48 1080,24 C1260,12 1380,20 1440,28 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="ewp-services-bg" aria-hidden="true">
        <div className="ewp-services-gradient" />
        <div className="ewp-services-pattern" />
        <span className="ewp-float-shape ewp-float-shape--1" />
        <span className="ewp-float-shape ewp-float-shape--2" />
        <span className="ewp-float-shape ewp-float-shape--3" />
      </div>

      <div className="ewp-services-inner">
        <header className="ewp-header">
          <span className="ewp-label">Education Welfare Program</span>
          <h2 id="ewp-services-heading">Our Services for Student Success</h2>
          <p>
            IWSHA FOUNDATION delivers trusted education welfare initiatives — from scholarships
            and coaching to mentorship and community outreach — empowering every child to learn,
            grow, and lead.
          </p>
        </header>

        <div className={`ewp-impact ${countersActive ? 'ewp-impact--active' : ''}`}>
          {welfareImpactStats.map((stat, index) => (
            <ImpactStat key={stat.label} stat={stat} active={countersActive} delay={index * 0.1} />
          ))}
        </div>

        <div className={`ewp-timeline ${timelineActive ? 'ewp-timeline--active' : ''}`}>
          <div className="ewp-timeline-track" aria-hidden="true">
            <span className="ewp-timeline-progress" />
          </div>
          <ol className="ewp-timeline-steps">
            {welfareTimeline.map((item, index) => (
              <li
                className="ewp-timeline-step"
                key={item.step}
                style={{ '--ewp-step-delay': `${index * 0.15}s` }}
              >
                <span className="ewp-timeline-dot">{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="ewp-grid">
          {welfareServices.map((service, index) => (
            <article
              className="ewp-card"
              key={service.id}
              style={{
                '--ewp-accent': service.accent,
                '--ewp-delay': `${index * 0.07}s`,
              }}
            >
              <span className="ewp-card-glow" aria-hidden="true" />
              <span className="ewp-card-shine" aria-hidden="true" />

              <div className="ewp-card-icon" aria-hidden="true">
                <ServiceIcon name={service.icon} />
              </div>

              <h3>{service.title}</h3>
              <p>{service.text}</p>

              <Link to={service.link} className="ewp-card-cta">
                {service.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
