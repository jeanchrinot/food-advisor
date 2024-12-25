import { OpenAIEmbeddings, OpenAI, ChatOpenAI } from "@langchain/openai"
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages"
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts"
import { BaseCheckpointSaver, StateGraph } from "@langchain/langgraph"
import { Annotation, START, END } from "@langchain/langgraph"
import { tool } from "@langchain/core/tools"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb"
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"
import { MongoClient } from "mongodb"
import { z } from "zod"
import { assistants } from "./data"
import { Prisma, PrismaClient } from "@prisma/client"
// import {
//   capitalizeAndRemoveSpaces,
//   isNonEmptyObject,
//   validateToolParams,
// } from "../utils/index";
// import { performActions, saveToolParams } from "../utils/flow";
// import getRetrieverTool from "./tools/retriever";
import { chatbotVoiceTypes } from "@/lib/agent/data"

const prisma = new PrismaClient()

const MONGO_URI = process.env.MONGODB_URI || ""

const getVoiceType = (voiceName: string) => {
  return chatbotVoiceTypes.find((voiceType) => voiceType.name === voiceName)
}

export async function callAgent(
  query: string,
  conversationId: string,
  userId: string
) {
  const voiceType = chatbotVoiceTypes[0]
  let botSettings = null
  let botNamePrompt = "Your name is Diet Advisor."
  let botVoicePrompt = `, with ${voiceType.name} voice that uses language style that is ${voiceType.description}`

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

  // Define the tasks for the agent to do
  const tasks: string[] = []

  // Define the tools for the agent to use
  let tools: any[] = []

  //   for (const assistant of assistants) {
  //     const assistantName = capitalizeAndRemoveSpaces(assistant.name);
  //     tasks.push(assistantName);
  //     // const activeTools = JSON.parse(assistant.active_tools);
  //     let activeTools;
  //     if (typeof assistant.active_tools === "string") {
  //       activeTools = JSON.parse(assistant.active_tools);
  //     } else {
  //       throw new Error("Expected assistant.active_tools to be a string.");
  //     }
  //     const assistantTools = activeTools.map((toolItem) => {
  //       // Create the schema object dynamically using params, if any
  //       const schemaObject =
  //         toolItem.params.length > 0
  //           ? toolItem.params.reduce((acc, param) => {
  //               acc[param.name] = z[param.type]().describe(param.description);
  //               return acc;
  //             }, {})
  //           : null;

  //       return tool(
  //         async (params = {}) => {
  //           console.log("params:", params);
  //           // Check for params to save
  //           if (isNonEmptyObject(params)) {
  //             const validationError = validateToolParams(params, toolItem.params); //Expected to return false when all params are valid
  //             if (validationError) {
  //               // Params are invalid, return a validation error message
  //               console.log("validationError", validationError);
  //               return validationError;
  //             }
  //             const res = await saveToolParams(
  //               projectId,
  //               assistant.id,
  //               userId,
  //               conversationId,
  //               toolItem.params,
  //               params
  //             );
  //           }
  //           //Check for actions to take
  //           if (toolItem.actions?.length) {
  //             const res = await performActions(
  //               assistant.id,
  //               userId,
  //               conversationId,
  //               toolItem.actions
  //             );
  //             console.log("action taken:", res);
  //           }
  //           console.log("toolItem params:", toolItem.params);
  //           console.log("toolItem actions:", toolItem.actions);
  //           console.log("toolItem message:", toolItem.messages[0].text);

  //           return toolItem.messages[0].text;
  //         },
  //         {
  //           name: `${assistantName}_${toolItem.slug}`,
  //           description: toolItem.description,
  //           schema: schemaObject ? z.object(schemaObject) : undefined,
  //         }
  //       );
  //     });

  //     tools = tools.concat(assistantTools);
  //   }

  // Add Retriever Tool
  //   const retrieverTool = getRetrieverTool(projectId, projectName);
  //   tools = [...tools, retrieverTool];
  // We can extract the state typing via `GraphState.State`
  const toolNode = new ToolNode<typeof GraphState.State>(tools)

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  }).bindTools(tools)

  async function callModel(state: typeof GraphState.State) {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are AI Diet Advisor, a knowledgeable and empathetic virtual assistant specialized in nutrition and dietary advice. Your role is to analyze food choices, provide nutrient insights, and offer tailored diet recommendations based on users' goals, preferences, and health conditions. \nCurrent time: {time}.`,
      ],
      new MessagesPlaceholder("messages"),
    ])
    const formattedPrompt = await prompt.formatMessages({
      time: new Date().toISOString(),
      //   task_names: tasks.map((task) => task).join(", "),
      //   tool_names: tools.map((tool) => tool.name).join(", "),
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
