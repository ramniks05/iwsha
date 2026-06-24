import { sponsorshipFaqs } from '../data/faqContent'

function FaqAnswer({ answer }) {
  if (answer.type === 'bullets') {
    return (
      <div className="faq-answer">
        <p>{answer.intro}</p>
        <ul className="faq-list">
          {answer.bullets.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
        {answer.outro ? <p>{answer.outro}</p> : null}
      </div>
    )
  }

  if (answer.type === 'checklist') {
    return (
      <div className="faq-answer">
        <p>{answer.intro}</p>
        <ul className="faq-checklist">
          {answer.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  if (answer.type === 'groups') {
    return (
      <div className="faq-answer">
        <p>{answer.intro}</p>
        <div className="faq-groups">
          {answer.groups.map((group) => (
            <div className="faq-group" key={group.title}>
              <h4>{group.title}</h4>
              <p>{group.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="faq-answer">
      {answer.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

function FaqSection({
  id = 'faq',
  label = 'FAQ',
  title = 'Sponsorship Questions Answered',
  description = 'Common questions about eligibility, applications, and what sponsorship packages typically include.',
  items = sponsorshipFaqs,
  compact = false,
}) {
  return (
    <section
      className={`faq-section${compact ? ' faq-section--compact' : ''}`}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className="faq-section-head">
        <span className="section-label">{label}</span>
        <h2 id={`${id}-heading`}>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>

      <div className="faq-list-wrap">
        {items.map((item, index) => (
          <details className="faq-item" key={item.id} open={index === 0}>
            <summary className="faq-question">
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <FaqAnswer answer={item.answer} />
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
