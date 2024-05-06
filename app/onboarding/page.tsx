"use client"
import Image from "next/image"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Pagination } from "swiper/modules"
import Learn from "./Learn"
import Recycle from "./Recycle"
import GetReward from "./GetReward"

export default function Onboarding() {
  return (
    <main className="flex min-h-screen overflow-hidden flex-col items-center justify-between">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active w-3 h-3",
        }}
        modules={[Pagination]}
        className="onboardingSwiper"
      >
        <SwiperSlide>
          <Learn />
        </SwiperSlide>
        <SwiperSlide>
          <Recycle />
        </SwiperSlide>
        <SwiperSlide>
          <GetReward />
        </SwiperSlide>
      </Swiper>
      {/* <div className="fixed text-center bottom-10">
        <div className="flex  text-center items-center justify-center mt-10">
          <div className="h-2 w-2 bg-lime-500 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full mx-10"></div>
          <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
        </div>
      </div> */}
    </main>
  )
}
