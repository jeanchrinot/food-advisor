import Image from "next/image"
import SkipOnboarding from "./SkipOnboarding"
import { useRouter } from "next/navigation"

const GetReward = () => {
  const router = useRouter()
  return (
    <>
      <div className=" mt-24 p-24 relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/images/recycling-king.png"
          alt="Next.js Logo"
          width={230}
          height={230}
          priority
        />
      </div>
      {/* <img
        src="/images/curve-bg.png"
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
      /> */}
      <div className="mb-16 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <h2 className="mb-3 text-3xl font-bold text-green-700">Ödül Kazan </h2>
        <div className="flex justify-center items-center">
          <p className="m-0 max-w-[30ch] text-gray-800 text-md opacity-90 text-center">
            Geri dönüşüm yaparak çevreye katkıda bulunduğunuz için ödüller
            kazanın ve yeşil bir geleceğe adım atın.
          </p>
        </div>
        <div className="mt-3 px-6">
          <button
            className="w-full bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/auth")}
          >
            Şimdi Başla
          </button>
        </div>
      </div>
    </>
  )
}

export default GetReward
