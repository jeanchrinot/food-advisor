import { Conversation, Message } from "@prisma/client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const defaultMessages = [
  {
    id: "676abc3c9e73a29ab2a67a5a",
    content:
      "Hi! I’m your AI Diet Advisor. I'm here to help you with nutrition and dietary advice. Whether you have questions about specific foods, need help with meal planning, or want to achieve certain health goals, I’m here to provide insights and recommendations tailored to your needs. How can I assist you today?",
    attachments: null,
    senderId: null,
    senderType: "bot",
    conversationId: "676abbb89e73a29ab2a67a56",
    deleted: false,
    status: null,
    createdAt: "2024-12-24T13:50:52.642Z",
    updatedAt: "2024-12-24T13:50:52.642Z",
  },
]

export type Store = {
  conversation: Conversation | null
  messages: Message[]
  foodScanResults: any
  setConversation: (conversation: Conversation) => void
  setMessages: (messages: Message[]) => void
  setFoodScanResults: (results: any) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      conversation: null,
      messages: defaultMessages as any,
      foodScanResults: null,
      setConversation: (conversation: Conversation) => set({ conversation }),
      setMessages: (messages: Message[]) => set({ messages }),
      setFoodScanResults: (results: any) => set({ foodScanResults: results }),
    }),
    {
      name: "chat-store", // Key in localStorage
      partialize: (state) => ({
        messages: state.messages,
        conversation: state.conversation,
      }), // Persist some states`
    }
  )
)
