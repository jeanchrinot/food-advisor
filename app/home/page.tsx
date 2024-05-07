import { Suspense } from "react"
import AppLayout from "@/components/app/AppLayout"
import Home from "./Home"

export const metadata = {
  title: "Anasayfa",
}
const HomePage = () => {
  return (
    <AppLayout activeItem="home">
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </AppLayout>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

export default HomePage
