"use client"

import useSWRMutation from "swr/mutation"
import React, { useRef, useState, useEffect } from "react"
import { Loader } from "lucide-react"
import {
  convertProbabilityToPercentage,
  getHighestProbabilityPrediction,
  uploadPhoto,
} from "@/lib/func"
import Loading from "@/components/app/Loading"

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [identifiedFood, setIdentifiedFood] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //   const [predictionResults, setPredictionResults] = useState(null)

  // Use SWR mutation for uploading the photo
  const {
    trigger: scanPhoto,
    data,
    isMutating,
    error,
  } = useSWRMutation(
    "https://poetic-commonly-stinkbug.ngrok-free.app/api/predict",
    uploadPhoto
  )

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("Error accessing the camera:", error)
    }
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL("image/png")
        setPhoto(imageData) // Save captured image as a base64 string
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const handleRetake = () => {
    setPhoto(null)
    startCamera()
  }

  const handleUpload = async () => {
    stopCamera()
    // Trigger the mutation to upload the photo
    const response = await scanPhoto({ imageData: photo })
    console.log("Upload successful:", response)
  }

  useEffect(() => {
    console.log("error", error)
  }, [error])

  useEffect(() => {
    console.log("data", data)
    if (data?.nutrition_info) {
      //show nutrition data
      const identifiedFood = getHighestProbabilityPrediction(data.predictions)
      setIdentifiedFood({
        ...identifiedFood,
        nutrition_info: data.nutrition_info,
      })
      //   setPredictionResults({nutrition_info:data.nutrition_info,})
    } else {
      //show error message
      setErrorMessage(data?.error || data?.message)
    }
  }, [data])

  useEffect(() => {
    startCamera()
  }, [])

  console.log("identifiedFood", identifiedFood)

  return (
    <>
      <div className=" mt-24 py-7 px-3 relative place-items-center">
        <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <div className="flex flex-col items-center justify-center">
            {identifiedFood && (
              <>
                <h1 className="text-2xl font-bold mb-2">
                  Identified Food (
                  {convertProbabilityToPercentage(identifiedFood?.probability)}
                  %)
                </h1>
                <div className="mb-4">
                  <h3 className="capitalize text-green-500 font-bold mb-2">
                    {identifiedFood?.class_name}
                  </h3>
                  <h4 className="text-xl font-bold">Nutrients</h4>
                  <p>Calorie: {identifiedFood?.nutrition_info?.kalori}</p>
                  <p>
                    Carbohydrate: {identifiedFood?.nutrition_info?.karbonhidrat}
                  </p>
                  <p>Proteine: {identifiedFood?.nutrition_info?.protein}</p>
                  <p>Fat: {identifiedFood?.nutrition_info?.yağ}</p>
                  <p>Fiber: {identifiedFood?.nutrition_info?.lif}</p>
                </div>
              </>
            )}
            {!identifiedFood && (
              <h1 className="text-2xl font-bold mb-4">Capture Food Photo</h1>
            )}

            {errorMessage && (
              <h3 className="text-red-500 font-bold mb-2">{errorMessage}</h3>
            )}

            <div className="camera-capture">
              {!photo && (
                <>
                  <div className="w-full px-2">
                    <div className="w-full py-6 border border-border border-green-500 rounded">
                      <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        className="mb-4"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center px-2 py-2">
                    <button
                      onClick={capturePhoto}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Capture Photo
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width="300"
                    height="300"
                    className="hidden"
                  />
                </>
              )}
              {photo && (
                <>
                  <img src={photo} alt="Captured" className="mb-4" />
                  <div className="w-full gap-2 flex items-center justify-center">
                    <button
                      onClick={() => handleRetake()}
                      className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Retake
                    </button>
                    <button
                      onClick={handleUpload}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Scan
                    </button>
                  </div>
                </>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              For accurate results, ensure your photo is clear and well-lit.
            </p>
          </div>
        </div>
      </div>
      {isMutating && <Loading />}
    </>
  )
}

export default CameraCapture
