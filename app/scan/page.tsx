import { Suspense } from "react"
import AppLayout from "@/components/app/AppLayout"
import Scan from "./Scan"

export const metadata = {
  title: "Scan Food",
}
const ScanPage = () => {
  return (
    <AppLayout activeItem="scan">
      <Suspense fallback={<Loading />}>
        <Scan />
      </Suspense>
    </AppLayout>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

export default ScanPage
