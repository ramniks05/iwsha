import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFaqChat } from '../context/FaqChatContext'
import { sponsorshipFaqs } from '../data/faqContent'

function FaqAnswerContent({ answer }) {
  if (answer.type === 'bullets') {
    return (
      <>
        <p>{answer.intro}</p>
        <ul className="faq-chat-list">
          {answer.bullets.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
        {answer.outro ? <p>{answer.outro}</p> : null}
      </>
    )
  }

  if (answer.type === 'checklist') {
    return (
      <>
        <p>{answer.intro}</p>
        <ul className="faq-chat-checklist">
          {answer.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </>
    )
  }

  if (answer.type === 'groups') {
    return (
      <>
        <p>{answer.intro}</p>
        {answer.groups.map((group) => (
          <div className="faq-chat-group" key={group.title}>
            <strong>{group.title}</strong>
            <p>{group.text}</p>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {answer.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  )
}

function FaqChatbot() {
  const { isOpen, toggleFaqChat, closeFaqChat } = useFaqChat()
  const [activeId, setActiveId] = useState(null)
  const bodyRef = useRef(null)

  const activeFaq = sponsorshipFaqs.find((f) => f.id === activeId)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [activeId, isOpen])

  const handleQuestion = (id) => {
    setActiveId(id)
  }

  const handleReset = () => {
    setActiveId(null)
  }

  const handleClose = () => {
    closeFaqChat()
    setActiveId(null)
  }

  return (
    <>
      {isOpen && (
        <div className="faq-chat-panel" role="dialog" aria-label="FAQ assistant">
          <header className="faq-chat-header">
            <div className="faq-chat-header-info">
              <span className="faq-chat-avatar" aria-hidden="true">💬</span>
              <div>
                <strong>IWSHA Assistant</strong>
                <span>Sponsorship FAQ</span>
              </div>
            </div>
            <button type="button" className="faq-chat-close" onClick={handleClose} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="faq-chat-body" ref={bodyRef}>
            <div className="faq-chat-msg faq-chat-msg--bot">
              <div className="faq-chat-bubble">
                Hello! I can help with sponsorship questions. Choose a topic below:
              </div>
            </div>

            {!activeFaq ? (
              <div className="faq-chat-questions">
                {sponsorshipFaqs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="faq-chat-question-btn"
                    onClick={() => handleQuestion(item.id)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="faq-chat-msg faq-chat-msg--user">
                  <div className="faq-chat-bubble">{activeFaq.question}</div>
                </div>
                <div className="faq-chat-msg faq-chat-msg--bot">
                  <div className="faq-chat-bubble faq-chat-bubble--answer">
                    <FaqAnswerContent answer={activeFaq.answer} />
                  </div>
                </div>
              </>
            )}
          </div>

          <footer className="faq-chat-footer">
            {activeFaq ? (
              <button type="button" className="faq-chat-footer-btn" onClick={handleReset}>
                ← Ask another question
              </button>
            ) : (
              <p className="faq-chat-footer-note">
                Still need help? <Link to="/contact" onClick={handleClose}>Contact us</Link>
              </p>
            )}
          </footer>
        </div>
      )}

      <button
        type="button"
        className={`faq-chat-toggle${isOpen ? ' faq-chat-toggle--open' : ''}`}
        onClick={toggleFaqChat}
        aria-label={isOpen ? 'Close FAQ chat' : 'Open FAQ chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 10h8M8 14h5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  )
}

export default FaqChatbot
