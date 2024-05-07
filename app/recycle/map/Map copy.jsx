/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client"

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api"

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
  lat: 40.78021222327535,
  lng: 29.94738687707855,
  name: "Kent 5",
  title: "Plastik",
}

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
    lat: 40.780153222248174,
    lng: 29.942181380537395,
    name: "Kent 3",
    title: "Plastik",
  },
  {
    lat: 40.77904049549875,
    lng: 29.936662432644642,
    name: "Tuana Evleri",
    title: "Metal",
  },
  {
    lat: 40.76819489303909,
    lng: 29.938197210475405,
    name: "Devlet Hastanesi",
    title: "Plastik",
  },
]

const MapComponent = () => {
  const onMarkerClick = (e) => {
    console.log(e)
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {coordinates.map(({ lat, lng, title }, index) => (
          <Marker
            key={index}
            position={{ lat: lat, lng: lng }}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
            title={title}
            // draggable={true}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
