import { useState } from "react";
import Bike from "../utils/Bike";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

interface LocationMarkerProps {
  bike: Bike;
  initialZoom: number;
  key: number;
}

export default function LocationMarker({ bike, initialZoom }: LocationMarkerProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const map = useMapEvents({
    zoom: (e) => {
      setZoom(e.target._zoom);
    },
  });
  // const icon = bike.large_img
  //   ? L.icon({
  //       iconUrl: bike.large_img,
  //       iconSize: [10 * zoom, 10 * zoom],
  //       className: "rounded-full border-2 border-red-500",
  //     })
  //   : L.icon({ iconUrl: "/marker.png"});
  const icon = L.icon({iconUrl: "/bike_icon.png", iconSize: [50, 50], className: "rounded-full bg-gray-100 px-1 py-1"})
  return (
    <Marker
      position={[bike?.latitude, bike?.longitude]}
      icon={icon}
    >
      <Popup>
        <h3>Location: {bike?.stolen_location}</h3>
        <Link href={`/bike/${bike._id}`}>View more details</Link>
      </Popup>
    </Marker>
  );
}
