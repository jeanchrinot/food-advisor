"use client"
import SearchBox from "@/components/app/SearchBox"
import { Camera, Image } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
const Home = () => {
  const [captureFrom, setCaptureFrom] = useState("")

  return (
    <div className=" mt-24 py-7 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Food Advisor</h1>
          <img src="/logo.png" className="w-1/2" />
          <p className="text-gray-600 mb-6 text-center px-6">
            Scan your food to get smart diet recommendations from AI.
          </p>
          {/* <p className="text-sm text-gray-500 mt-6 text-center">
            For accurate results, ensure your photo is clear and well-lit.
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Home
