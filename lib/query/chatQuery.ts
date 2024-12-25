// import { useMutation } from "@tanstack/react-query"

// import axios from "axios"

// const apiClient = axios.create({ baseURL: "" })

// interface SendMessageProps {
//   message: string | null
// }

// export const useSendMessage = () => {
//   return useMutation({
//     mutationFn: async ({ message }: SendMessageProps) => {
//       const response = await apiClient.post("/api/chat/message", { message })
//       return response.data
//     },
//   })
// }
