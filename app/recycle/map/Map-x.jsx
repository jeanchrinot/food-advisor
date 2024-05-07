"use client"

import GoogleMap from "google-maps-react-markers"
import { useRef, useState } from "react"

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const Marker = (props) => {
  const { onClick } = props
  return <div onClick={onClick}>{props?.name}</div>
}

const Map = () => {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)

  const mapOptions = {}

  const defaultCoordinate = {
    lat: 37.7768006,
    lng: -122.4187928,
    name: "Twitter HQ",
  }

  const coordinates = [{ ...defaultCoordinate }]

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    setMapReady(true)
  }

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log("This is ->", markerId)

    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng })
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  }

  return (
    <>
      {mapReady && <div>Map is ready. See for logs in developer console.</div>}
      <GoogleMap
        apiKey={apiKey}
        defaultCenter={defaultCoordinate}
        defaultZoom={18}
        options={mapOptions}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log("Map moved", map)}
      >
        {coordinates.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            name={name}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
            // draggable={true}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          />
        ))}
      </GoogleMap>
    </>
  )
}

export default Map
