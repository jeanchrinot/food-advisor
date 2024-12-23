"use client"
import { CircleUser } from "lucide-react"
const Header = () => {
  let userInfo = { name: "Jean" }
  if (typeof window !== "undefined") {
    if (localStorage.getItem("userInfo")) {
      userInfo = JSON.parse(localStorage.getItem("userInfo") || "")
    }
  }
  return (
    <div className="fixed left-0 top-0 flex px-2 w-full border-b border-gray-300 py-3 bg-white shadow-sm shadow-bottom z-10">
      <div className="flex flex-row text-left items-start">
        <button className="w-7 mr-2">
          <CircleUser className="w-6 h-6" />
        </button>
        <span>
          Hello, <span className="font-bold">{userInfo.name}!</span>
        </span>
      </div>
    </div>
  )
}

export default Header
