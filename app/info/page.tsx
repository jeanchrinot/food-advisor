import AppLayout from "@/components/app/AppLayout"
import Info from "./Info"

export const metadata = {
  title: "Bilgi",
}
const InfoPage = () => {
  return (
    <AppLayout activeItem="info">
      <Info />
    </AppLayout>
  )
}

export default InfoPage
