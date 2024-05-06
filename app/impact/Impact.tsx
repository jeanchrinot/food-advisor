import Image from "next/image"
const Impact = () => {
  return (
    <div className=" mt-24 p-24 relative z-[-1] place-items-center">
      <h1 className="w-full text-center font-bold">Katkı</h1>
      <br />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/images/info.png"
        alt="Next.js Logo"
        width={230}
        height={230}
        priority
      />
    </div>
  )
}

export default Impact
