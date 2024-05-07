import AppLayout from "@/components/app/AppLayout"
import { MapProvider } from "@/providers/mapProvider"
import { MapComponent } from "./Map"

export const metadata = {
  title: "Yeşil Nokta Ara",
}
const MapPage = () => {
  return (
    <AppLayout activeItem="recycle">
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </AppLayout>
  )
}

export default MapPage

// export default function Home() {

//   return (
//     <MapProvider>
//       <MapComponent/>
//     </MapProvider>
//   );
// }
