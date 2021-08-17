import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { withRouter } from "next/router";
const DEFAULT_MAP_CENTER = [38.4816758, -100.5638913];


function MapPage(props: any) {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <div className="mx-auto pt-24">
      <Head>
        <title>Stolen Bikes - Map</title>
      </Head>
      <MapWithNoSSR
        zoom={props.router.query.lat ? 8 : 4}
        center={
          props.router.query.lat && props.router.query.long
            ? [props.router.query.lat, props.router.query.long]
            : DEFAULT_MAP_CENTER
        }
      />
    </div>
  );
}

export default withRouter(MapPage);
