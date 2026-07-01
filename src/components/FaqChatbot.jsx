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
  const { isOpen, openFaqChat, closeFaqChat, openSignal } = useFaqChat()
  const [activeId, setActiveId] = useState(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const bodyRef = useRef(null)

  const activeFaq = sponsorshipFaqs.find((f) => f.id === activeId)

  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false)
    }
  }, [isOpen, openSignal])

  useEffect(() => {
    if (bodyRef.current && isOpen && !isMinimized) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [activeId, isOpen, isMinimized])

  const handleQuestion = (id) => {
    setActiveId(id)
  }

  const handleReset = () => {
    setActiveId(null)
  }

  const handleClose = () => {
    closeFaqChat()
    setActiveId(null)
    setIsMinimized(false)
    setIsMaximized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setIsMaximized(false)
  }

  const handleMaximize = () => {
    setIsMaximized((v) => !v)
    setIsMinimized(false)
  }

  const handleRestore = () => {
    setIsMinimized(false)
    openFaqChat()
  }

  const widgetClass = [
    'faq-chat-widget',
    !isOpen ? 'faq-chat-widget--closed' : '',
    isOpen && isMinimized ? 'faq-chat-widget--minimized' : '',
    isOpen && isMaximized ? 'faq-chat-widget--maximized' : '',
    isOpen && !isMinimized && !isMaximized ? 'faq-chat-widget--normal' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={widgetClass}>
      {!isOpen ? (
        <button
          type="button"
          className="faq-chat-launcher"
          onClick={openFaqChat}
          aria-label="Open FAQ assistant"
        >
          <span className="faq-chat-avatar" aria-hidden="true">💬</span>
          <span className="faq-chat-launcher-text">
            <strong>IWSHA Assistant</strong>
            <span>Sponsorship FAQ</span>
          </span>
        </button>
      ) : (
        <div className="faq-chat-panel" role="dialog" aria-label="FAQ assistant">
          <header
            className="faq-chat-header"
            onClick={isMinimized ? handleRestore : undefined}
            role={isMinimized ? 'button' : undefined}
            tabIndex={isMinimized ? 0 : undefined}
            onKeyDown={
              isMinimized
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleRestore()
                    }
                  }
                : undefined
            }
          >
            <div className="faq-chat-header-info">
              <span className="faq-chat-avatar" aria-hidden="true">💬</span>
              <div>
                <strong>IWSHA Assistant</strong>
                <span>Sponsorship FAQ</span>
              </div>
            </div>

            <div className="faq-chat-window-controls" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="faq-chat-control-btn"
                onClick={handleMinimize}
                aria-label="Minimize"
                title="Minimize"
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="button"
                className="faq-chat-control-btn"
                onClick={handleMaximize}
                aria-label={isMaximized ? 'Restore down' : 'Maximize'}
                title={isMaximized ? 'Restore down' : 'Maximize'}
              >
                {isMaximized ? (
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M4.5 2.5h5v5M2.5 4.5v5h5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <rect
                      x="2.5"
                      y="2.5"
                      width="7"
                      height="7"
                      rx="0.75"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                    />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="faq-chat-control-btn faq-chat-control-btn--close"
                onClick={handleClose}
                aria-label="Close"
                title="Close"
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 3l6 6M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          {!isMinimized && (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default FaqChatbot
