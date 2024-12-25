import { useStore } from "@/lib/store/useStore"
import { ElementRef, Fragment, useEffect, useRef } from "react"
import { MessageBubble } from "./bubbles/MessageBubble"

const Messages = () => {
  const { messages } = useStore()
  const chatRef = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className="relative h-full bg-white flex-grow overflow-auto gap-2 flex flex-col px-4 scrollbar-sm"
      ref={chatRef}
    >
      <div className="pt-4">
        {messages?.map((message, index) => {
          return (
            <Fragment key={index}>
              <MessageBubble message={message} />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Messages
