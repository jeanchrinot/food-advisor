"use client"

import React, { useRef, useState } from "react"

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [photo, setPhoto] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
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

  return (
    <div className="camera-capture">
      <h1>Camera Capture</h1>
      {!photo && (
        <>
          <video ref={videoRef} width="300" height="200" className="mb-4" />
          <button
            onClick={startCamera}
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Open Camera
          </button>
          <button
            onClick={capturePhoto}
            className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Capture Photo
          </button>
          <button
            onClick={stopCamera}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Stop Camera
          </button>
          <canvas ref={canvasRef} width="300" height="200" className="hidden" />
        </>
      )}
      {photo && (
        <>
          <img src={photo} alt="Captured" className="mb-4" />
          <button
            onClick={() => setPhoto(null)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Retake
          </button>
        </>
      )}
    </div>
  )
}

export default CameraCapture
