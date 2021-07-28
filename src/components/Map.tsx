import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../services/api";

interface Bike {
  date_stolen: number;
  description: string;
  frame_colors: [];
  frame_model: string;
  id: number;
  large_img: string;
  manufacturer_name: string;
  registry_name: string;
  stolen: boolean;
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
  stolen_record: {
    latitude: number;
    longitude: number;
    location: string;
  };
}

interface LocationMarkerProps {
  bike: Bike;
  key: number;
}

const Map = () => {
  const [bikesData, setBikesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  function LocationMarker({ bike }: LocationMarkerProps) {
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
        })
      : L.icon({ iconUrl: "/marker.png" });
    return (
      <Marker
        position={[
          bike?.stolen_record?.latitude,
          bike?.stolen_record?.longitude,
        ]}
        icon={icon}
      >
        <Popup>
          <h3>Location: {bike?.stolen_record?.location}</h3>
          <a href={`/bike/${bike.id}`}>View more details</a>
        </Popup>
      </Marker>
    );
  }

  useEffect(() => {
    async function fetchBikeData() {
      const response = await api.get("search", {
        params: {
          per_page: 100,
          stolenness: "stolen",
        },
      });

      const results = await Promise.all(
        response.data.bikes.map(async (bike: any) => {
          const response = await api.get(`/bikes/${bike.id}`);
          return response.data.bike;
        })
      );

      setBikesData(results);
      setIsLoading(false);
    }
    fetchBikeData();
  }, []);

  if (isLoading) {
    return <h2 className="font-bold text-center">Loading...</h2>;
  }

  return (
    <MapContainer
      style={{ width: "100vw", height: "80vh" }}
      center={[38.4816758, -100.5638913]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bikesData.length &&
        bikesData.map((bike: any) => {
          if (bike?.stolen_record?.latitude) {
            return <LocationMarker key={bike?.id} bike={bike} />;
          }
        })}
    </MapContainer>
  );
};

export default Map;
