"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import data from "@/lib/data"
import toast, { Toaster } from "react-hot-toast"

const Reward = () => {
  const { rewards } = data
  const [showRewardDetails, setShowRewardDetails] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [availablePoints, setAvailablePoints] = useState(0)
  const [myCount, setMyCount] = useState(0)
  const [selectedReward, setSelectedReward] = useState(null)

  const handleRewardDetails = (reward) => {
    setSelectedReward(reward)
    setShowRewardDetails(true)
  }
  const handleCloseRewardDetails = () => {
    setShowRewardDetails(false)
  }
  const handleUseReward = () => {
    let availablePoints = parseInt(
      localStorage.getItem("availablePoints") || "0"
    )
    if (availablePoints > 0) {
      availablePoints -= selectedReward.points
    }
    if (availablePoints <= 0) {
      availablePoints = 0
    }
    localStorage.setItem("availablePoints", availablePoints)
    setShowRewardDetails(false)
    toast.success(`${selectedReward.points} puanın kullanıldı!`)
  }

  useEffect(() => {
    if (localStorage.getItem("totalPoints")) {
      setTotalPoints(parseInt(localStorage.getItem("totalPoints") || "0"))
    }
    if (localStorage.getItem("availablePoints")) {
      setAvailablePoints(
        parseInt(localStorage.getItem("availablePoints") || "0")
      )
    }
    if (localStorage.getItem("myCount")) {
      setMyCount(parseInt(localStorage.getItem("myCount") || "0"))
    }
  })

  return (
    <>
      <div className=" mt-16 py-3 px-5 relative place-items-center">
        <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="w-full h-full flex items-center justify-center px-3 py-2 text-center border border-lime-400 rounded-xl bg-white">
              <span className="block w-full text-center mt-2">
                Toplam İşlem
              </span>
              <span className="w-full h-full flex text-center mt-2 font-bold text-gray-800 justify-center items-center">
                {myCount}
              </span>
            </div>
            <div className="w-full h-full flex items-center justify-center px-3 py-2 text-center border border-lime-400 rounded-xl bg-white">
              <span className="block w-full text-center mt-2">
                Toplam Puanım
              </span>
              <span className="w-full h-full flex text-center mt-2 font-bold text-gray-800 justify-center items-center">
                {totalPoints}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-3">
            <div className="w-full h-full flex items-center justify-center px-3 py-2 text-center border border-lime-400 rounded-xl bg-white">
              <span className="block w-full text-center mt-2">
                Kullanabileceğim Puan
              </span>
              <span className="w-full h-full flex text-center mt-2 font-bold text-gray-800 justify-center items-center">
                {availablePoints}
              </span>
            </div>
          </div>
          <h2 className="mb-2 text-lg text-green-700 mt-3 font-bold">
            Ödüller
          </h2>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {rewards.map((reward, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleRewardDetails(reward)}
                  className={`w-full flex items-center justify-center px-3 py-2 text-center border rounded-xl bg-white ${
                    availablePoints >= reward.points
                      ? "border-green-700"
                      : "border-lime-400"
                  }`}
                >
                  <span className="block w-full text-center mt-2">
                    {reward.name}
                  </span>
                  <span className="">
                    <svg
                      className={`w-10 h-10 ${
                        availablePoints >= reward.points ? "text-green-700" : ""
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" />
                    </svg>
                    <span className="text-xs text-lime-700">
                      {reward.points}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <Toaster />
      </div>
      {selectedReward && showRewardDetails && (
        <div className="w-full h-full absolute top-14 bottom-0 z-10 bg-white rounded-md p-2">
          <h3 className="text-gray-800 text-md font-bold">Ödül Detayı</h3>
          <p className="text-green-700 text-sm font-bold">
            {selectedReward.name}
          </p>
          <p className="text-gray-800 text-sm font-bold">
            {selectedReward.details}
          </p>
          {availablePoints < selectedReward.points ? (
            <p className="text-red-500 text-sm">
              Bu ödülü alabilmek için {selectedReward.points} puan biriktirmeniz
              gerekir.
            </p>
          ) : (
            <p className="text-gray-800 text-sm">
              Bu ödülü kullandığında {selectedReward.points} puanın
              kullanılacak.
            </p>
          )}

          <div className="flex">
            {availablePoints >= selectedReward.points ? (
              <button
                className="block text-xs border border-green-700 bg-green-700  text-white font-bold rounded p-1 mr-2"
                onClick={handleUseReward}
              >
                Kullan
              </button>
            ) : (
              ""
            )}
            <button
              onClick={handleCloseRewardDetails}
              className="block text-xs border border-green-700 text-green-700 font-bold p-1 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Reward
