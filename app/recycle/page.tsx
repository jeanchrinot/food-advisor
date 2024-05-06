import AppLayout from "@/components/app/AppLayout"
import Recycle from "./Recycle"

export const metadata = {
  title: "Geri Dönüştür",
}
const RecyclePage = () => {
  return (
    <AppLayout activeItem="recycle">
      <Recycle />
    </AppLayout>
  )
}

export default RecyclePage
