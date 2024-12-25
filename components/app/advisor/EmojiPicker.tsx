import data from "@emoji-mart/data"
import { Smile } from "lucide-react"
import Picker from "@emoji-mart/react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/app/ui/popover"

interface EmojiPickerProps {
  onChange: (value: string) => void
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={-40}
        className="bg-transparent border-none mr-5 shadow-none drop-shadow-none mb-16 max-w-full"
      >
        <Picker
          theme={"light"}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
