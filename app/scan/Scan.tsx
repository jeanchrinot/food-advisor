"use client"
import SearchBox from "@/components/app/SearchBox"
import { Camera, Image } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { getHighestProbabilityPrediction, uploadFromDevice } from "@/lib/func"
import Loading from "@/components/app/Loading"
import ScanResultsModal from "@/components/app/scan/ScanResultsModal"
import { useStore } from "@/lib/store/useStore"
const Scan = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { foodScanResults, setFoodScanResults } = useStore()
  // Use SWR mutation for uploading the photo
  const {
    trigger: scanPhoto,
    data,
    isMutating,
    error,
  } = useSWRMutation(
    "https://poetic-commonly-stinkbug.ngrok-free.app/api/predict",
    uploadFromDevice
  )

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] // Get the selected file
    if (!file) return

    // Trigger the mutation to upload the photo
    const response = await scanPhoto({ file })
    console.log("Upload successful:", response)

    // try {
    //   const response = await uploadFromDevice("YOUR_UPLOAD_URL", { arg: { file } });
    //   console.log("Upload successful:", response);
    // } catch (error) {
    //   console.error("Upload failed:", error);
    // }
  }

  useEffect(() => {
    console.log("error", error)
  }, [error])

  useEffect(() => {
    console.log("data", data)
    if (data?.nutrition_info) {
      // Set state for food scan results
      const identifiedFood = getHighestProbabilityPrediction(data.predictions)
      setFoodScanResults({
        ...identifiedFood,
        nutrition_info: data.nutrition_info,
      })
    } else {
      //show error message
      setErrorMessage(data?.error || data?.message)
    }
  }, [data])

  return (
    <>
      <div className=" mt-24 py-7 px-5 relative place-items-center">
        <div className="mb-16 grid text-left lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Scan Your Food</h1>
            <p className="text-gray-600 mb-6 text-center">
              Upload or capture a photo to learn about the nutritional value of
              your food.
            </p>
            {errorMessage && (
              <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
            )}
            <div className="w-full flex gap-4">
              <Link
                href="/scan/camera"
                className="flex-1 flex flex-col items-center gap-2 border border-border bg-green-500 text-white px-4 py-4 rounded shadow"
              >
                <span>
                  <Camera className="w-8 h-8" />
                </span>
                <span className="text-sm">Camera</span>
              </Link>

              <label
                htmlFor="file"
                className="flex-1 flex flex-col items-center gap-2 border border-border bg-white px-4 py-4 rounded shadow"
              >
                <span>
                  <Image className="w-8 h-8" />
                </span>
                <span className="text-sm">Gallery</span>
                <input
                  id="file"
                  className="w-1 h-1 z-0 opacity-0"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              For accurate results, ensure your photo is clear and well-lit.
            </p>
          </div>
        </div>
      </div>
      {isMutating && <Loading />}
      {foodScanResults && <ScanResultsModal />}
    </>
  )
}

export default Scan
