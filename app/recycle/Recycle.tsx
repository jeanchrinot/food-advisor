"use client"

import SearchBox from "@/components/app/SearchBox"
import Image from "next/image"
import data from "@/lib/data"
import { useState, useEffect } from "react"
// import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const Recycle = () => {
  //   const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedWasteCategory, setSelectedWasteCategory] = useState(null)
  const { wasteCategories } = data
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    // const { search } = router.query
    const q = searchParams.get("q") || ""
    if (typeof q === "string") {
      setSearchTerm(q)
    }
  }, [searchParams])

  //   useEffect(() => {
  //     // const { search } = router.query
  //     const q = searchParams.get("q") || ""
  //     if (typeof q === "string") {
  //       setSearchTerm(q)
  //     }
  //   }, [selectedWasteCategory])

  const filteredCategories = wasteCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className=" mt-16 py-3 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <h2 className="mb-2 text-lg text-green-700">
          Hangi atığı atmak istiyorsunuz?
        </h2>
        <p className="text-gray-800 text-sm mb-2">
          En yakın <b>Yeşil Nokta</b> bulmak için atık türünü seçiniz
        </p>
        <div className="flex justify-center items-center">
          <SearchBox />
        </div>
        {/* <div className="flex mt-5 justify-between mb-3">
          <h3 className="text-lg font-bold text-green-700">Nasıl Çalışır?</h3>
          <h4 className="ml-auto text-green-700 text-sm mt-1 text-right">
            Daha fazla bilgi
          </h4>
        </div> */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {filteredCategories.map((wasteCat) => {
            return (
              <Link href={`/recycle/map?cat=${wasteCat.id}`}>
                <div className="">
                  <div className="w-full flex items-center justify-center px-3 text-center border border-lime-400 rounded-xl bg-white">
                    <span className="block w-full text-center mt-2">
                      {wasteCat.name}
                    </span>
                    <Image
                      className="relative"
                      src="/images/garbage-separation.png"
                      alt="Next.js Logo"
                      width={80}
                      height={80}
                      priority
                    />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Recycle
