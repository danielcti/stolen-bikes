import { useState, useEffect } from "react";
import BikeCard from "../components/BikeCard";
import api from "../services/api";
import Link from "next/link";
import Pagination from '../components/Pagination';

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
}

export default function Home({ bikesData }: any) {
  const [filteredBikesData, setFilteredBikesData] = useState<Bike[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFilteredBikesData(bikesData);
    setIsLoading(false);
  }, [bikesData]);

  useEffect(() => {
    const filtered = bikesData.filter((bike: any) => {
      return (
        bike.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
        bike.stolen_location?.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredBikesData(filtered);
  }, [searchInput]);

  function handlePageChange(mode: string): void {
    if (mode === "previous") {
      if (page > 1) {
        setPage(page - 1);
      }
    } else {
      if (page * 10 < filteredBikesData.length) {
        setPage(page + 1);
      }
    }
  }

  return (
    <div className="bg-gray-925 pb-6 ">
      <section className="fixed flex justify-center flex-col items-center w-full bg-gray-925 py-4 z-20">
        <h1 className="font-bold text-4xl uppercase text-indigo-50">
          Stolen Bikes Reports
        </h1>
        <Link href="/map">
          <a className="text-red-500 block mt-4 underline">
            View stolen bikes map
          </a>
        </Link>

        <input
          className="bg-indigo-50 border-none rounded px-6 py-3 mt-4 placeholder-gray-950 text-gray-800"
          placeholder="Search for bikes titles or locations"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {!isLoading && (
          <Pagination page={page} changePage={handlePageChange} length={filteredBikesData?.length}/>
        )}
      </section>
      <div className="pt-52 max-w-3xl m-auto">
        {filteredBikesData?.length > 0 &&
          filteredBikesData.map((bike: any, i: number) => {
            if (i >= (page - 1) * 10 && i < page * 10)
              return <BikeCard data={bike} key={i} />;
          })}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await api.get(`search`, {
    params: {
      per_page: 100,
      stolenness: "stolen",
    },
  });

  return {
    props: {
      bikesData: response.data.bikes,
    },
  };
};
