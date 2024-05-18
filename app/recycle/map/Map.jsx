/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client"

import { generateRandomCoordinates } from "@/lib/utils"
import data from "@/lib/data"
//Map component Component from library
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import toast, { Toaster } from "react-hot-toast"

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "15px 0px 0px 15px",
}

//K2's coordinates
// const defaultMapCenter = {
//   lat: 35.8799866,
//   lng: 76.5048004,
// }

const defaultMapCenter = {
  id: 1,
  lat: 40.78021222327535,
  lng: 29.94738687707855,
  name: "Kent 5",
  title: "Plastik",
  cat: 1,
}

// Generate random coordinates within 10 km of the default map center
const radiusInKm = 3

//Default zoom level, can be adjusted
const defaultMapZoom = 12

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
}

const customMarkerIcon = {
  url: `/images/map-marker.png`,
  scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
  origin: new window.google.maps.Point(0, 0), // Position of the marker's image origin
  anchor: new window.google.maps.Point(20, 40), // Position of the marker's anchor
}

const centerMarkerIcon = {
  url: `/images/current-location-marker.png`,
  scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
  origin: new window.google.maps.Point(0, 0), // Position of the marker's image origin
  anchor: new window.google.maps.Point(20, 40), // Position of the marker's anchor
}

const MapComponent = () => {
  const router = useRouter()
  const [map, setMap] = useState(null)
  const [destination, setDestination] = useState(null)
  const [showDirectionsSevice, setShowDirectionsSevice] = useState(false)
  const [directions, setDirections] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [allCoordinates, setAllCoordinates] = useState([])
  const [filteredCoordinates, setFilteredCoordinates] = useState([])
  const [selectedCoordinate, setSelectedCoordinate] = useState(null)
  const [userLocation, setUserLocation] = useState(defaultMapCenter)
  const pathIndex = useRef(0)
  const pathCoordinates = useRef([])
  const [QRCodeScanPrompt, setQRCodeScanPrompt] = useState(false)
  const [userArrived, setUserArrived] = useState(false)
  const [selectedCat, setSelectedCat] = useState(null)

  const { wasteCategories } = data

  const searchParams = useSearchParams()

  useEffect(() => {
    // const { search } = router.query

    const cat = searchParams.get("cat") || ""
    console.log("cat", cat)
    if (cat) {
      setSelectedCat(cat)
      const tempCoordinates = allCoordinates.filter((coord) => coord.cat == cat)
      setFilteredCoordinates(tempCoordinates)
      console.log("tempCoordinates", tempCoordinates)
    } else {
      setFilteredCoordinates(allCoordinates)
    }
  }, [searchParams, allCoordinates])

  useEffect(() => {
    // List to store all coordinates
    let allCoordinates = []
    if (localStorage.getItem("allCoordinates")) {
      allCoordinates = JSON.parse(localStorage.getItem("allCoordinates"))
    }

    if (allCoordinates.length == 0) {
      // Loop through waste categories
      let coordId = 1
      wasteCategories.forEach((category) => {
        // Generate five random coordinates for each category
        for (let i = 0; i < 5; i++) {
          const randomCoordinates = generateRandomCoordinates(
            defaultMapCenter,
            radiusInKm
          ) // 10 km radius
          allCoordinates.push({
            cat: category.id,
            lat: randomCoordinates.lat,
            lng: randomCoordinates.lng,
            title: category.name,
            id: coordId,
          })
          coordId++
        }
      })
      localStorage.setItem("allCoordinates", JSON.stringify(allCoordinates))
    }

    console.log("allCoordinates", allCoordinates)
    setAllCoordinates(allCoordinates)
    // setFilteredCoordinates(allCoordinates)
  }, [])

  const handleMarkerClick = (event, id) => {
    const clickedMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }
    const foundCoordinate = filteredCoordinates.find((coord) => coord.id === id)
    setDestination(clickedMarkerPosition)
    setShowDirectionsSevice(true)
    setSelectedCoordinate(foundCoordinate)
    setShowDirections(false)
  }

  const onShowDirections = () => {
    setShowDirections(true)
  }

  // SIMULATE USER MOVEMENT

  const simulateUserMovement = useCallback(() => {
    if (
      pathCoordinates.current.length > 0 &&
      pathIndex.current < pathCoordinates.current.length - 1
    ) {
      pathIndex.current += 1
      setUserLocation(pathCoordinates.current[pathIndex.current])
    }
    // setUserLocation((prevLocation) => ({
    //   ...prevLocation,
    //   lat: prevLocation.lat + 0.001,
    // }))
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(simulateUserMovement, 2000)
  //   return () => clearInterval(interval)
  // }, [simulateUserMovement])

  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setShowDirectionsSevice(false)
        setDirections(response)
        // const route = response.routes[0]
        // const legs = route.legs[0]
        // const steps = legs.steps
        // const coordinates = []
        // steps.forEach((step) => {
        //   step.path.forEach((latLng) => {
        //     coordinates.push({
        //       lat: latLng.lat(),
        //       lng: latLng.lng(),
        //     })
        //   })
        // })
        // pathCoordinates.current = coordinates
        // pathIndex.current = 0
        // setUserLocation(coordinates[0])
      } else {
        console.error("Directions request failed due to " + response.status)
      }
    }
    // if (response !== null) {
    //   if (response.status === "OK") {
    //     setDirections(response)
    //   } else {
    //     console.error("Directions request failed due to " + response.status)
    //   }
    // }
  }

  console.log("destination", destination)

  const handleUserArrived = () => {
    // setDirections(null)
    setUserLocation(destination)
    setUserArrived(true)
  }

  const handleQRCodePrompt = () => {
    setQRCodeScanPrompt(true)
  }

  const handleQRCodeResult = (text, result) => {
    console.log("text", text)
    console.log("result", result)
    setQRCodeScanPrompt(false)
    setDirections(null)
    // Give 50 points award to user
    // Update Total Points
    let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0")
    totalPoints += 50
    localStorage.setItem("totalPoints", totalPoints)

    // Update available points
    let availablePoints = parseInt(
      localStorage.getItem("availablePoints") || "0"
    )
    availablePoints += 50
    localStorage.setItem("availablePoints", availablePoints)

    // Update myCount
    let myCount = parseInt(localStorage.getItem("myCount") || "0")
    myCount += 1
    localStorage.setItem("myCount", myCount)

    toast.success("İşlem tamamlandı!")
    // router.push("/home")
    // setTimeout(() => {
    //   router.push("/home") // Replace '/destination' with your desired destination route
    // }, 2000) // 2000 milliseconds = 2 seconds
  }

  const handleQRCodeError = (e) => {
    console.log(e)
    toast.error("Bir hata oluştu, lütfen tekrar deneyin!")
  }

  return (
    <div className="w-full pb-16">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        // onLoad={(map) => setMap(map)}
      >
        {showDirectionsSevice && (
          <DirectionsService
            options={{
              destination: destination,
              origin: userLocation,
              travelMode: "WALKING", // or 'WALKING', 'BICYCLING', 'TRANSIT'
            }}
            // callback={handleDirectionsCallback}
            callback={(response) => {
              if (response !== null) {
                setDestination(null)
                setDirections(response)
              }
            }}
          />
        )}

        {directions && showDirections && (
          <DirectionsRenderer directions={directions} />
        )}

        <Marker
          position={{ lat: defaultMapCenter.lat, lng: defaultMapCenter.lng }}
          icon={centerMarkerIcon}
        />

        {filteredCoordinates.length > 0 &&
          filteredCoordinates.map(({ lat, lng, title, id }, index) => {
            let label = null
            if (selectedCat) {
              label = {
                fontSize: "8pt",
                text: title,
                color: "#000",
                fontWeight: "bold",
              }
            }
            return (
              <Marker
                key={index}
                position={{ lat: lat, lng: lng }}
                onClick={(event) => handleMarkerClick(event, id)}
                label={label}
                icon={customMarkerIcon}
              />
            )
          })}
        {directions && selectedCoordinate && (
          <div className="w-1/2 absolute bottom-24 z-10 bg-white rounded-md mx-2 p-2">
            <h3 className="text-green-700 text-md font-bold">
              <span className="text-gray-800">{selectedCoordinate.title}</span>{" "}
              Yeşil Nokta
            </h3>
            <p className="text-gray-800 text-sm">Turan Güneş Cd. 125</p>
            <p className="text-gray-800 text-sm font-semibold">300 m | 5 dk</p>
            <div className="flex">
              <button
                onClick={onShowDirections}
                className="block text-xs border border-green-700 bg-green-700  text-white font-bold rounded p-1 mr-2"
              >
                Yol Tarifi
              </button>
              {userArrived ? (
                <button
                  className="block text-xs border border-green-700 text-green-700 font-bold p-1 rounded"
                  onClick={handleQRCodePrompt}
                >
                  QR Kod Okut
                </button>
              ) : (
                <button
                  className="block text-xs border border-green-700 text-green-700 font-bold p-1 rounded"
                  onClick={handleUserArrived}
                >
                  Geldim
                </button>
              )}
            </div>
          </div>
        )}
        {QRCodeScanPrompt && (
          <div className="w-full absolute bottom-24 z-10 bg-white rounded-md p-2">
            <h3 className="text-green-700 text-md font-bold">QR kodu okutun</h3>
            <p className="text-gray-800 text-sm">
              Atık atma işlemini tamamlamak için kutu üzerindeki qr kodunu
              okutun
            </p>
            <Scanner
              onResult={(text, result) => handleQRCodeResult(text, result)}
              onError={(error) => handleQRCodeError(error)}
              enabled={QRCodeScanPrompt}
            />
          </div>
        )}
      </GoogleMap>
      <Toaster />
    </div>
  )
}

export { MapComponent }
