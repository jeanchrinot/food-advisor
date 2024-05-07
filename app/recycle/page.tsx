import AppLayout from "@/components/app/AppLayout"
import Recycle from "./Recycle"
import { Suspense } from "react"

export const metadata = {
  title: "Geri Dönüştür",
}
const RecyclePage = () => {
  return (
    <AppLayout activeItem="recycle">
      <Suspense fallback={<Loading />}>
        <Recycle />
      </Suspense>
    </AppLayout>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

export default RecyclePage
