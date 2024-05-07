import Image from "next/image"
const Reward = () => {
  return (
    <div className=" mt-16 py-3 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="w-full h-full flex items-center justify-center px-3 py-2 text-center border border-lime-400 rounded-xl bg-white">
            <span className="block w-full text-center mt-2">Toplam İşlem</span>
            <span className="w-full h-full flex text-center mt-2 font-bold text-gray-800 justify-center items-center">
              30
            </span>
          </div>
          <div className="w-full h-full flex items-center justify-center px-3 py-2 text-center border border-lime-400 rounded-xl bg-white">
            <span className="block w-full text-center mt-2">Puanım</span>
            <span className="w-full h-full flex text-center mt-2 font-bold text-gray-800 justify-center items-center">
              300
            </span>
          </div>
        </div>
        <h2 className="mb-2 text-lg text-green-700 mt-3 font-bold">
          Ödüllerim
        </h2>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="">
            <div className="w-full flex items-center justify-center px-3 text-center border border-lime-400 rounded-xl bg-white">
              <span className="block w-full text-center mt-2">
                İndirim Kodu
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
          <div className="">
            <div className="w-full flex items-center justify-center px-3 text-center border border-lime-400 rounded-xl bg-white">
              <span className="block w-full text-center mt-2">
                İndirim Kodu
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
        </div>
      </div>
    </div>
  )
}

export default Reward
