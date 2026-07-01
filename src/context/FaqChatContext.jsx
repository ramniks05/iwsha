import { createContext, useCallback, useContext, useState } from 'react'

const FaqChatContext = createContext(null)

export function FaqChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openFaqChat = useCallback(() => setIsOpen(true), [])
  const closeFaqChat = useCallback(() => setIsOpen(false), [])
  const toggleFaqChat = useCallback(() => setIsOpen((v) => !v), [])

  return (
    <FaqChatContext.Provider value={{ isOpen, setIsOpen, openFaqChat, closeFaqChat, toggleFaqChat }}>
      {children}
    </FaqChatContext.Provider>
  )
}

export function useFaqChat() {
  const ctx = useContext(FaqChatContext)
  if (!ctx) throw new Error('useFaqChat must be used within FaqChatProvider')
  return ctx
}
