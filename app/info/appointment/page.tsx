import AppLayout from "@/components/app/AppLayout"
import Form from "./Form"

export const metadata = {
  title: "Randevu al",
}
const RecyclePage = () => {
  return (
    <AppLayout activeItem="appointment">
      <Form />
    </AppLayout>
  )
}

export default RecyclePage
