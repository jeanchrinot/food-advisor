import { callAgent } from "@/lib/agent/graph"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: any) => {
  try {
    // Extract the message from the request body
    const payload = await req.json()
    let { message } = payload

    let userId = "676a868b6756ad164f50242f" // default user id

    // Fetch user
    const user = await prisma.user.findFirst({
      where: { id: userId },
    })
    // Find conversation that belongs to the user
    let conversation = await prisma.conversation.findFirst({
      where: { userId: user.id },
    })

    // If the user doesn't have any conversation, create one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { user: { connect: { id: user!.id } } },
      })
    }

    //Create User Message
    const userMessage = await prisma.message.create({
      data: {
        content: message,
        senderId: user.id,
        senderType: "user",
        conversationId: conversation.id,
      },
    })

    // Get response from bot
    const response = await callAgent(message, conversation.id, userId)

    //Create Bot Message
    const botMessage = await prisma.message.create({
      data: {
        content: response as any, // Bypass TypeScript checks
        senderType: "bot",
        conversationId: conversation.id,
      },
    })

    // Return the bot response
    return Response.json(
      {
        response: {
          userMessage,
          message: botMessage,
          conversation,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error:", error)
    return Response.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
