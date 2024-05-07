import SearchBox from "@/components/app/SearchBox"
import Image from "next/image"
import Link from "next/link"
const Home = () => {
  return (
    <div className=" mt-24 py-7 px-5 relative place-items-center">
      <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <p className="text-md text-green-700">Yeşil bir dünyaya adım a</p>
        <h2 className="mb-3 text-lg font-bold text-green-700">
          Atığı dönüştür, çevreye katkıda bulun ve ödülleri kap!
        </h2>
        <div className="flex justify-center items-center">
          <SearchBox />
        </div>
        <div className="flex mt-5 justify-between mb-3">
          <h3 className="text-lg font-bold text-green-700">Nasıl Çalışır?</h3>
          <h4 className="ml-auto text-green-700 text-sm mt-1 text-right">
            Daha fazla bilgi
          </h4>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <div className="w-full flex items-center justify-center px-3 text-center">
              <Image
                className="relative border border-green-700 rounded-full bg-white"
                src="/images/garbage-separation.png"
                alt="Next.js Logo"
                width={90}
                height={90}
                priority
              />
            </div>
            <span className="block w-full text-center mt-2">
              Atıkları türüne göre ayırt.
            </span>
          </div>
          <div className="w-1/2 items-center justify-center">
            <div className="w-full flex items-center justify-center px-3 text-center">
              <Image
                className="relative border border-green-700 rounded-full bg-white"
                src="/images/green-point.png"
                alt="Next.js Logo"
                width={90}
                height={90}
                priority
              />
            </div>
            <span className="block w-full text-center mt-2">
              En yakın <b>Yeşil Nokta</b>'ya götür.
            </span>
          </div>
        </div>
        <div className="flex items-center mt-2 justify-center">
          <Link
            href="/recycle/map"
            className="block mt-2 mb-3 border border-green-700 text-green-700 font-bold py-2 px-4 rounded"
          >
            Yeşil Noktaları Bul
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
