import { Suspense } from "react"
import AppLayout from "@/components/app/AppLayout"
import CameraCapture from "./Camera"

export const metadata = {
  title: "Scan Food",
}
const CaptureCameraPage = () => {
  return (
    <AppLayout activeItem="scan">
      <Suspense fallback={<Loading />}>
        <CameraCapture />
      </Suspense>
    </AppLayout>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

export default CaptureCameraPage
