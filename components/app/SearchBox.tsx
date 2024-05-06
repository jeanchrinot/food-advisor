"use client"
// import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useSearchParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

const SearchBox = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""

  // const handleSearch = (e) => {
  //     const newSearchTerm = e.target.value;
  //     router.push({
  //       pathname: router.pathname,
  //       query: { ...router.query, search: newSearchTerm }
  //     });
  //   };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    // setSearchTerm(newSearchTerm);
    router.push(`${pathname}?q=${newSearchTerm}`)
  }

  return (
    <form action="" method="POST" className="w-full">
      <div className="relative w-full">
        <button className="absolute left-2 top-1/2 -translate-y-1/2">
          <svg
            className="w-6 h-6 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Yeşil Nokta ara: plastik, metal, ..."
          className="w-full rounded-lg py-3 bg-white pl-9 pr-4 focus:outline-none xl:w-125"
          name="q"
          defaultValue={q}
          onChange={handleSearch}
        />
      </div>
    </form>
  )
}

export default SearchBox
