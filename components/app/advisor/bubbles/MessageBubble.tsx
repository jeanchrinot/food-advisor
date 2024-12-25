// local imports
import { Message } from "@prisma/client"
import { UserMessageBubble } from "./UserMessageBubble"
import { BotMessageBubble } from "./BotMessageBubble"

export function MessageBubble({ message }: { message: Message }) {
  if (message?.senderType === "bot") {
    return <BotMessageBubble message={message} />
  } else if (message?.senderType === "user") {
    return <UserMessageBubble message={message} />
  }
  return <></>
}
