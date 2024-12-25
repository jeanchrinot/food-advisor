import { createId } from "@paralleldrive/cuid2"

export const createObjectId = () => {
  return createId()
}

interface Prediction {
  class_name: string
  probability: number
}

export const uploadPhoto = async (
  url: string,
  { arg }: { arg: { imageData: string } }
) => {
  const formData = new FormData() // Create a new FormData instance
  const byteCharacters = atob(arg.imageData.split(",")[1]) // Decode the base64 image string
  const byteArrays = []

  // Convert the byte characters into an array of bytes
  for (let offset = 0; offset < byteCharacters.length; offset++) {
    byteArrays.push(byteCharacters.charCodeAt(offset))
  }

  const byteArray = new Uint8Array(byteArrays)

  // Create a Blob from the byte array
  const blob = new Blob([byteArray], { type: "image/png" })

  // Append the Blob to the FormData instance
  formData.append("file", blob, "captured-image.png")

  const res = await fetch(url, {
    method: "POST",
    body: formData, // Send FormData instead of JSON
  })

  if (!res.ok) {
    console.log("res", res)
    if (res.status == 404) {
      return res.json()
      //   throw new Error("Failed to scan image")
    } else {
      throw new Error("Failed to upload image")
    }
  }

  return res.json() // Return the server response (success or error)
}

export const uploadFromDevice = async (
  url: string,
  { arg }: { arg: { file: File } }
) => {
  const formData = new FormData() // Create a new FormData instance

  // Append the File directly to the FormData instance
  formData.append("file", arg.file, arg.file.name)

  const res = await fetch(url, {
    method: "POST",
    body: formData, // Send FormData
  })

  if (!res.ok) {
    console.log("res", res)
    if (res.status === 404) {
      return res.json()
      // throw new Error("Failed to scan image");
    } else {
      throw new Error("Failed to upload image")
    }
  }

  return res.json() // Return the server response (success or error)
}

export const getHighestProbabilityPrediction = (
  predictions: Prediction[]
): Prediction => {
  if (predictions.length === 0) {
    throw new Error("Predictions array cannot be empty")
  }

  // Find the prediction with the highest probability
  return predictions.reduce((max, prediction) =>
    prediction.probability > max.probability ? prediction : max
  )
}

export const convertProbabilityToPercentage = (probability: number): number => {
  return Math.round(probability * 100) // Multiply by 100 and round to nearest integer
}

export const createUserMessage = ({ text }: { text: string | null }) => {
  const userMessage = {
    id: createObjectId(),
    content: text,
    attachments: null,
    senderId: null,
    senderType: "user",
    conversationId: null,
    deleted: false,
    status: "sending",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return userMessage
}
