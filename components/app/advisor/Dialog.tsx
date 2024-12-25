"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { MessageInput } from "./MessageInput"
import Messages from "./Messages"

// Local imports
// import { Header } from "./Header"
// import { MessageForm } from "./MessageForm"
// import { useLayout } from "@/hooks/useLayout"
// import Messages from "./Messages"
// import { useStore } from "@/hooks/useStore"
// import { ParticipantType } from "@prisma/client"
// import QuickReplies from "./QuickReplies"

interface DialogProps {
  infoMessage: React.ReactNode
  isOpen: boolean
  name: string
  welcomeMessage: string
  onClose: () => void
}

const quickReplies = [
  "I want to get a free e-book.",
  "I would like to get a free quote for a website design.",
]

export function Dialog() {
  // const { session } = useSession()
  //   const { messages, setMessages, setQuickReplies, widgetSettings } = useStore()
  const [expanded, setExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div
      className={`flex flex-col text-black dark:text-white fixed top-10 right-0 max-w-full overflow-hidden transition-all w-full`}
      style={{ bottom: "4.5rem" }}
    >
      <Messages />
      <MessageInput />
    </div>
  )
}
