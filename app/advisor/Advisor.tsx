"use client"
import SearchBox from "@/components/app/SearchBox"
import { Camera, Image } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Dialog } from "@/components/app/advisor/Dialog"
const Advisor = () => {
  const [captureFrom, setCaptureFrom] = useState("")

  return (
    <div className="mt-12 relative place-items-center">
      <div className="mb-16">
        <div className="flex flex-col items-center justify-center">
          <Dialog />
        </div>
      </div>
    </div>
  )
}

export default Advisor
