"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const router = useRouter()

  const onSubmit = () => {
    console.log("Submitted...")
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen w-screen overflow-hidden flex-col items-center justify-between">
      <div className="mt-24 px-4 py-24 relative flex place-items-center">
        <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <h2 className="mb-3 text-3xl font-bold text-green-700">Giriş Yap </h2>
          <p className="m-0 max-w-[30ch] text-gray-800 text-md opacity-90 text-center m-auto">
            Yeşil bir dünyaya adım atmak için hesabınıza giriş yapın.
          </p>
          <div className="flex w-full justify-center items-center">
            <span className="w-1/2 border-b border-slate-400 py-3 mb-3"></span>
          </div>
          <div className="mt-3 px-6 w-full">
            {/* <form> */}
            <label className="block mb-3">
              <span className="block text-left text-sm text-gray-700">
                E-posta
              </span>
              <input
                type="email"
                value=""
                placeholder="test@example.com"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </label>
            <label className="block mb-3">
              <span className="block text-left text-sm text-gray-700">
                Şifre
              </span>
              <input
                type="password"
                value=""
                placeholder=""
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </label>
            <button
              type="submit"
              onClick={onSubmit}
              className="w-full mb-3 border bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Giriş Yap
            </button>
            <a
              href="/auth/register"
              className="block w-full mb-3 border border-green-700 text-green-700 font-bold py-2 px-4 rounded"
            >
              Hesap Oluştur
            </a>
            {/* </form> */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
