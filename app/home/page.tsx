import AppLayout from "@/components/app/AppLayout"
import Home from "./Home"

export const metadata = {
  title: "Anasayfa",
}
const HomePage = () => {
  return (
    <AppLayout activeItem="home">
      <Home />
    </AppLayout>
  )
}

export default HomePage
