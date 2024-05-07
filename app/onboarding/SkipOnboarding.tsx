import { useRouter } from "next/navigation"

const SkipOnboarding = () => {
  const router = useRouter()
  return (
    <p
      className="fixed text-semibold text-green-700 right-0 top-0 flex w-full justify-end pb-6 pt-8 px-8"
      onClick={() => router.push("/auth")}
    >
      Bu adımı atla
    </p>
  )
}

export default SkipOnboarding
