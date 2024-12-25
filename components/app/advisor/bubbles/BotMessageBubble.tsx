import { format } from "date-fns"

import { Message } from "@prisma/client"
import { BotMessageSquare } from "lucide-react"

export function BotMessageBubble({
  message,
}: {
  message: Message
}): JSX.Element {
  return (
    <div className="flex my-2 space-x-2">
      <div className="flex">
        <span className="text-gray-800 opacity-90">
          <BotMessageSquare className="w-5 h-5" />
        </span>
      </div>
      <div className={`flex flex-col items-start`}>
        <div
          className={`relative flex max-w-xs whitespace-pre-wrap bg-slate-200 py-2 px-2 rounded-b-2xl rounded-tr-2xl mr-9`}
        >
          <p className="text-sm font-normal text-gray-700 mb-2">
            {message?.content}
          </p>
          <p
            className="text-xs text-slate-500 self-end font-light whitespace-nowrap absolute right-4 bottom-0"
            style={{ fontSize: "9px" }}
          >
            {format(new Date(message?.createdAt), "HH:mm a")}
          </p>
        </div>
      </div>
    </div>
  )
}
