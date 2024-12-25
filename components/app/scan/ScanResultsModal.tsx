import { convertProbabilityToPercentage } from "@/lib/func"
import { useStore } from "@/lib/store/useStore"
import { useRouter } from "next/navigation"

const ScanResultsModal = () => {
  const router = useRouter()
  const { foodScanResults, setFoodScanResults } = useStore()

  const handleCancel = () => {
    setFoodScanResults(null)
  }

  const handleAskAIAdvisor = () => {
    router.push("/advisor")
  }

  if (!foodScanResults) return <></>
  return (
    <div className="w-full h-screen bg-neutral-500/50 px-2 flex flex-col fixed z-30 justify-center items-center top-0 bottom-0">
      <div className="flex flex-col py-4 bg-gray-200 w-full justify-center items-center">
        <h1 className="text-2xl font-bold mb-2">Identified Food</h1>
        <div className="mb-4">
          <h3 className="capitalize text-green-500 font-bold mb-2">
            {foodScanResults?.class_name} (
            {convertProbabilityToPercentage(foodScanResults?.probability)}
            %)
          </h3>
          <h4 className="text-xl font-bold">Nutrients</h4>
          <p>
            Calorie:{" "}
            <span className="font-bold">
              {foodScanResults?.nutrition_info?.kalori}
            </span>
          </p>
          <p>
            Carbohydrate:
            <span className="font-bold">
              {foodScanResults?.nutrition_info?.karbonhidrat}
            </span>
          </p>
          <p>
            Proteine:{" "}
            <span className="font-bold">
              {foodScanResults?.nutrition_info?.protein}
            </span>
          </p>
          <p>
            Fat:{" "}
            <span className="font-bold">
              {foodScanResults?.nutrition_info?.yağ}
            </span>
          </p>
          <p>
            Fiber:{" "}
            <span className="font-bold">
              {foodScanResults?.nutrition_info?.lif}
            </span>
          </p>
        </div>
        <div className="flex ">
          <button
            onClick={handleCancel}
            className="mr-2 bg-neutral-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAskAIAdvisor}
            className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Ask AI Advisor
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScanResultsModal
