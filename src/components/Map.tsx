import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../services/api";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import LocationMarker from './LocationMarker';

interface MapProps {
  center?: [number,number]; 
}

const Map = ({center}: MapProps) => {
  const [bikesData, setBikesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return (
      <div className="flex justify-center items-center h-48">
      <Loader
        type="Circles"
        color="#FF4654"
        height={100}
        width={100}
      />
      </div>
    );
  }

  return (
    <MapContainer
      style={{ width: "100vw", height: "80vh" }}
      center={center ||[38.4816758, -100.5638913]}
      zoom={4}
      minZoom={3}
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
