import AppLayout from "@/components/app/AppLayout"
import Impact from "./Impact"

export const metadata = {
  title: "Katkı",
}
const ImpactPage = () => {
  return (
    <AppLayout activeItem="impact">
      <Impact />
    </AppLayout>
  )
}

export default ImpactPage
