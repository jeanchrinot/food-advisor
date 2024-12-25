import { Suspense } from "react"
import AppLayout from "@/components/app/AppLayout"
import Advisor from "./Advisor"

export const metadata = {
  title: "Chat with Advisor",
}
const AdvisorPage = () => {
  return (
    <AppLayout activeItem="advisor">
      <Suspense fallback={<Loading />}>
        <Advisor />
      </Suspense>
    </AppLayout>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

export default AdvisorPage
