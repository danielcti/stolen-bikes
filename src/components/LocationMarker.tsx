import { useState } from "react";
import Bike from "../utils/Bike";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

interface LocationMarkerProps {
  bike: Bike;
  key: number;
}

export default function LocationMarker({ bike }: LocationMarkerProps) {
  const [zoom, setZoom] = useState(4);
  const map = useMapEvents({
    zoom: (e) => {
      setZoom(e.target._zoom);
    },
  });
  const icon = bike.large_img
    ? L.icon({
        iconUrl: bike.large_img,
        iconSize: [10 * zoom, 10 * zoom],
        className: "rounded-full border-2 border-red-500",
      })
    : L.icon({ iconUrl: "/marker.png"});
  return (
    <Marker
      position={[bike?.stolen_record?.latitude, bike?.stolen_record?.longitude]}
      icon={icon}
    >
      <Popup>
        <h3>Location: {bike?.stolen_record?.location}</h3>
        <Link href={`/bike/${bike.id}`}>View more details</Link>
      </Popup>
    </Marker>
  );
}
