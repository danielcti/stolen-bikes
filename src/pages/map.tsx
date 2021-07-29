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
    <div className="mx-auto">
      <Head>
        <title>Stolen Bikes - Map</title>
      </Head>
      <div className="text-center pt-6 pb-4 z-10 bg-gray-925 w-full">
        <h1 className="font-bold text-4xl text-indigo-50 uppercase">
          Stolen Bikes Reports
        </h1>
        <Link href="/">
          <a className="text-red-500 block mt-4 underline">
            View stolen bikes list
          </a>
        </Link>
      </div>
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
