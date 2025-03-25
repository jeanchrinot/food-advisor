import { ChatOpenAI } from "@langchain/openai"
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages"
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts"
import { BaseCheckpointSaver, StateGraph } from "@langchain/langgraph"
import { Annotation, START, END } from "@langchain/langgraph"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI = process.env.MONGODB_URI || ""

export async function callAgent(
  query: string,
  conversationId: string,
  userId: string
) {
  // Define the MongoDB database and collection
  const client = new MongoClient(MONGO_URI)
  const dbName = "diet_advisor"
  // const db = client.db(dbName);

  // Define the LangGraph State
  const GraphState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
      reducer: (x, y) => x.concat(y),
    }),
  })

  // Define the tools for the agent to use
  let tools: any[] = []
  const toolNode = new ToolNode<typeof GraphState.State>(tools)

  //Initialize OpenAI Model
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  }).bindTools(tools)

  // Define the agent graph node, this will be called as the main agent response
  async function callModel(state: typeof GraphState.State) {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are AI Diet Advisor, a knowledgeable and empathetic virtual assistant specialized in nutrition and dietary advice. 
        Your role is to analyze food choices, provide nutrient insights, and offer tailored diet recommendations based on users' 
        goals, preferences, and health conditions. \nCurrent time: {time}.`,
      ],
      new MessagesPlaceholder("messages"),
    ])
    const formattedPrompt = await prompt.formatMessages({
      time: new Date().toISOString(),
      messages: state.messages,
    })
    const result = await model.invoke(formattedPrompt as any)
    return { messages: [result] }
  }

  function shouldContinue(state: typeof GraphState.State) {
    const messages = state.messages
    const lastMessage = messages[messages.length - 1] as AIMessage
    // If the LLM makes a tool call, then we route to the "tools" node
    if (lastMessage.tool_calls?.length) {
      return "tools"
    }
    // Otherwise, we stop (reply to the user)
    return "__end__"
  }

  const workflow = new StateGraph(GraphState)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent")

  console.log("workflow", workflow)

  // Initialize the MongoDB memory to persist state between graph runs
  const checkpointer = new MongoDBSaver({ client, dbName })

  // Initialize a new graph for the first time
  const app = workflow.compile({
    checkpointer: checkpointer as unknown as BaseCheckpointSaver,
  }) //Type error: Type 'MongoDBSaver' is not assignable to type 'BaseCheckpointSaver'.

  // Use the Runnable
  const finalState = await app.invoke(
    {
      messages: [new HumanMessage(query)],
    },
    { recursionLimit: 15, configurable: { thread_id: conversationId } }
  )

  // console.log(JSON.stringify(finalState.messages, null, 2));
  console.log(finalState.messages[finalState.messages.length - 1].content)

  return finalState.messages[finalState.messages.length - 1].content
}
