"use client"
import Link from "next/link"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const Form = () => {
  const [company, setCompany] = useState("")
  const [date, setDate] = useState("")
  const onSubmit = () => {
    console.log("Submitted...")
    if (company && date) {
      toast.success("Randevunuz kaydedilmiştir!")
    } else {
      toast.error("Lütfen, Şirket ve tarih seçin!")
    }
  }

  return (
    <div className=" mt-16 py-3 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <h2 className="mb-2 text-lg text-green-700">Randevu Alma İşlemi</h2>
        <p className="text-gray-800 text-sm mb-2">
          Randevu formu, geri dönüşüm yapan şirketlerden bilgi seansı için
          randevu almayı sağlayan bir araçtır. Bu form aracılığıyla, ilgili
          şirketle iletişime geçerek bilgi seansı için uygun bir zaman dilimi
          belirleyebilirsiniz.
        </p>
      </div>
      <div className="mt-3 px-6 w-full">
        {/* <form> */}
        <label className="block mb-3">
          <span className="block text-left text-sm text-gray-700">
            Şirket Seçin
          </span>
          <input
            type="email"
            defaultValue="X Firması"
            placeholder="X Firması"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="block mb-3">
          <span className="block text-left text-sm text-gray-700">
            Tarih Seçin
          </span>
          <input
            type="date"
            placeholder=""
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full mb-3 border bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Kaydet
        </button>
        <Link
          href="/home"
          className="block w-full mb-3 border border-green-700 text-green-700 font-bold py-2 px-4 rounded"
        >
          Vazgeç
        </Link>
        {/* </form> */}
      </div>
      <Toaster />
    </div>
  )
}

export default Form
