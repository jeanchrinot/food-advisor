// Local imports
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import { Input } from "@/components/app/ui/input"
import { EmojiPicker } from "./EmojiPicker"
import { useEffect, useState } from "react"
import { createUserMessage } from "@/lib/func"
import { useStore } from "@/lib/store/useStore"
import useSWRMutation from "swr/mutation"

async function sendMessageFn(url, { arg }: { arg: { message: string } }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

export function MessageInput() {
  const {
    setConversation,
    messages,
    setMessages,
    foodScanResults,
    setFoodScanResults,
  } = useStore()
  const [inputValue, setInputValue] = useState("")
  const {
    trigger: sendMessage,
    isMutating: isSending,
    data: responseData,
  } = useSWRMutation("/api/chat/message", sendMessageFn)

  // Update States After Getting Response From Bot
  useEffect(() => {
    console.log("responseData", responseData)

    if (responseData?.response) {
      setConversation(responseData.response.conversation)
      setMessages([
        ...messages.slice(0, -1),
        responseData.response.userMessage,
        responseData.response.message,
      ])
    }
  }, [responseData, setMessages])

  // Handle Message Input Submit
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const message = inputValue
      console.log("message", message)
      //Create a user message
      const userMessage = createUserMessage({
        text: message,
      })

      setMessages([...messages, userMessage])
      sendMessage(
        { message: message },
        {
          onSuccess: (data) => {
            console.log("Message sent:", data)
          },
          onError: (error) => {
            console.error("Error sending message:", error)
          },
        }
      )
      //Reset Input
      setInputValue("")
    } catch (e) {
      console.error("Error posting message:", e)
    }
  }

  useEffect(() => {
    if (foodScanResults) {
      try {
        const nutritionDetails = Object.entries(foodScanResults.nutrition_info)
          .map(([key, value]) => `${key}: ${value}`) // Format each nutrition entry
          .join(", ") // Combine them into a single string

        const message = `Analyse this food scan results: food name: ${foodScanResults.class_name}, nutrition: ${nutritionDetails}`
        console.log("message", message)
        //Create a user message
        const userMessage = createUserMessage({
          text: message,
        })

        setMessages([...messages, userMessage])
        sendMessage(
          { message: message },
          {
            onSuccess: (data) => {
              console.log("Message sent:", data)
            },
            onError: (error) => {
              console.error("Error sending message:", error)
            },
          }
        )
        //Reset Food Scan Results
        setFoodScanResults(null)
      } catch (e) {
        console.error("Error posting message:", e)
      }
    }
  }, [foodScanResults, setFoodScanResults])

  console.log("foodScanResults", foodScanResults)

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-4 pb-2 pt-1 bg-white border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex items-center gap-x-3 flex-1 gap-1 relative">
        <EmojiPicker
          onChange={(emoji: string) => setInputValue(`${inputValue} ${emoji}`)}
        />
        <Input
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          value={inputValue}
          placeholder="Type something..."
          disabled={isSending}
          className="bg-transparent text-neutral-500 resize-none w-full border border-gray-300 outline-none focus:outline-none focus:border-zinc-400 focus:ring-0 focus:ring-offset-0 rounded-full px-3 flex-1 no-scrollbar"
        />
        <div className="flex">
          <button
            className={`inline-flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none bg-gradient-to-br from-green-500 to-green-400 text-white rounded-full h-[42px] w-[42px] p-0 self-end`}
            type="submit"
            aria-label="Send Message"
            disabled={isSending || inputValue == ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-8 rtl:rotate-180 skew-x-6"
            >
              <path d="m3 3 3 9-3 9 19-9Z"></path>
              <path d="M6 12h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}
