import { createContext, useCallback, useContext, useState } from 'react'

const FaqChatContext = createContext(null)

export function FaqChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [openSignal, setOpenSignal] = useState(0)

  const openFaqChat = useCallback(() => {
    setIsOpen(true)
    setOpenSignal((s) => s + 1)
  }, [])
  const closeFaqChat = useCallback(() => setIsOpen(false), [])
  const toggleFaqChat = useCallback(() => {
    setIsOpen((v) => {
      const next = !v
      if (next) setOpenSignal((s) => s + 1)
      return next
    })
  }, [])

  return (
    <FaqChatContext.Provider value={{ isOpen, openSignal, setIsOpen, openFaqChat, closeFaqChat, toggleFaqChat }}>
      {children}
    </FaqChatContext.Provider>
  )
}

export function useFaqChat() {
  const ctx = useContext(FaqChatContext)
  if (!ctx) throw new Error('useFaqChat must be used within FaqChatProvider')
  return ctx
}
