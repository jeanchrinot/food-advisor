"use client"
import SearchBox from "@/components/app/SearchBox"
import { Camera, Image } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
const Scan = () => {
  const [captureFrom, setCaptureFrom] = useState("")

  return (
    <div className=" mt-24 py-7 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Scan Your Food</h1>
          <p className="text-gray-600 mb-6 text-center">
            Upload or capture a photo to learn about the nutritional value of
            your food.
          </p>

          <div className="w-full flex gap-4">
            <Link
              href="/scan/camera"
              className="flex-1 flex flex-col items-center gap-2 border border-border bg-green-500 text-white px-4 py-4 rounded shadow"
            >
              <span>
                <Camera className="w-8 h-8" />
              </span>
              <span className="text-sm">Camera</span>
            </Link>

            <button className="flex-1 flex flex-col items-center gap-2 border border-border bg-white px-4 py-4 rounded shadow">
              <span>
                <Image className="w-8 h-8" />
              </span>
              <span className="text-sm">Gallery</span>
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            For accurate results, ensure your photo is clear and well-lit.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Scan
