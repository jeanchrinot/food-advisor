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
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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
const radiusInKm = 10

//Default zoom level, can be adjusted
const defaultMapZoom = 12

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
}

const coordinates = [
  { ...defaultMapCenter },
  {
    id: 2,
    lat: 40.780153222248174,
    lng: 29.942181380537395,
    name: "Kent 3",
    title: "Plastik",
    cat: 1,
  },
  {
    id: 3,
    lat: 40.77904049549875,
    lng: 29.936662432644642,
    name: "Tuana Evleri",
    title: "Metal",
    cat: 2,
  },
  {
    id: 4,
    lat: 40.76819489303909,
    lng: 29.938197210475405,
    name: "Devlet Hastanesi",
    title: "Plastik",
    cat: 1,
  },
]

const customMarkerIcon = {
  url: `/images/map-marker.png`,
  scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
  origin: new window.google.maps.Point(0, 0), // Position of the marker's image origin
  anchor: new window.google.maps.Point(20, 40), // Position of the marker's anchor
}

const MapComponent = () => {
  const [destination, setDestination] = useState(null)
  const [directions, setDirections] = useState(null)
  const [showDirections, setShowDirections] = useState(false)
  const [allCoordinates, setAllCoordinates] = useState([])
  const [filteredCoordinates, setFilteredCoordinates] = useState([])
  const [selectedCoordinate, setSelectedCoordinate] = useState(null)

  const { wasteCategories } = data

  const randomCoordinates = generateRandomCoordinates(
    defaultMapCenter,
    radiusInKm
  )

  const searchParams = useSearchParams()
  const [category, setCategory] = useState(null)

  useEffect(() => {
    // const { search } = router.query

    const cat = searchParams.get("cat") || ""
    console.log("cat", cat)
    if (cat) {
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
    setSelectedCoordinate(foundCoordinate)
    setShowDirections(false)
  }

  const onShowDirections = () => {
    setShowDirections(true)
  }

  console.log("filteredCoordinates", filteredCoordinates)

  return (
    <div className="w-full pb-16">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: defaultMapCenter,
              travelMode: "WALKING", // or 'WALKING', 'BICYCLING', 'TRANSIT'
            }}
            callback={(response) => {
              console.log("response", response)
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

        {filteredCoordinates.length > 0 &&
          filteredCoordinates.map(({ lat, lng, title, id }, index) => (
            <Marker
              key={index}
              position={{ lat: lat, lng: lng }}
              onClick={(event) => handleMarkerClick(event, id)}
              label={{
                fontSize: "8pt",
                text: title,
                color: "#000",
                fontWeight: "bold",
              }}
              icon={customMarkerIcon}
            />
          ))}
        {!showDirections && directions && selectedCoordinate && (
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
              {/* <button className="block text-xs border border-green-700 text-green-700 font-bold p-1 rounded">
                Haritada Göster
              </button> */}
            </div>
          </div>
        )}
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
