import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <div className="mx-auto">
      <Head>
        <title>Stolen Bikes - Map</title>
      </Head>
      <div className="text-center pt-6 pb-4 z-10 bg-gray-100 w-full">
        <h1 className="font-bold text-3xl">Stolen Bikes Reports</h1>
        <Link href="/">
          <a className="text-blue-600 block mt-4 underline">
            View stolen bikes list
          </a>
        </Link>
      </div>
      <MapWithNoSSR />
    </div>
  );
}
