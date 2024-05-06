"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const AuthPage = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen w-screen overflow-hidden flex-col items-center justify-between">
      <div className="mt-24 px-4 py-24 relative flex place-items-center">
        <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <h2 className="mb-3 text-3xl font-bold text-green-700">Giriş Yap </h2>
          <p className="m-0 max-w-[30ch] text-gray-800 text-md opacity-90 text-center m-auto">
            Yeşil bir dünyaya adım atmak için giriş yapın veya hesabınızı
            oluşturun.
          </p>
          <div className="flex w-full justify-center items-center"></div>
          <div className="mt-3 px-6 w-full">
            <button
              className="w-full bg-transparent mb-3 border border-green-700 text-green-700 font-bold py-2 px-4 rounded"
              onClick={() => router.push("/home")}
            >
              Facebook ile devam et
            </button>
            <button
              className="w-full mb-3 border border-green-700 text-green-700 font-bold py-2 px-4 rounded"
              onClick={() => router.push("/home")}
            >
              Google ile devam et
            </button>
            <button
              className="w-full mb-3 border bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/auth/login")}
            >
              E-posta ile devam et
            </button>
            <button
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/home")}
            >
              Daha sonra
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AuthPage
