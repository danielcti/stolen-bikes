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
import axios from 'axios';

const Map = (props: any) => {
  const [bikesData, setBikesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBikeData() {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bikes`);
      setBikesData(response.data);
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
      center={props.center}
      zoom={props.zoom}
      minZoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      {bikesData.length &&
        bikesData.map((bike: any) => {
          if (bike?.stolen_location) {
            return <LocationMarker key={bike?._id} bike={bike} initialZoom={props.zoom} />;
          }
        })}
    </MapContainer>
  );
};

export default Map;
