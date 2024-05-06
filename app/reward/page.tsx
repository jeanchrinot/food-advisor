import AppLayout from "@/components/app/AppLayout"
import Reward from "./Reward"

export const metadata = {
  title: "Ödül",
}
const RewardPage = () => {
  return (
    <AppLayout activeItem="reward">
      <Reward />
    </AppLayout>
  )
}

export default RewardPage
