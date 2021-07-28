import { useState, useEffect } from "react";
import BikeCard from "../components/BikeCard";
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
}

function Home() {
  const [bikesData, setBikesData] = useState<Bike[]>([]);
  const [filteredBikesData, setFilteredBikesData] = useState<Bike[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBikeData() {
      const response = await api.get("search", {
        params: {
          per_page: 100,
          stolenness: "stolen",
        },
      });
      setBikesData(response.data.bikes);
      setFilteredBikesData(response.data.bikes);
      setIsLoading(false);
    }
    fetchBikeData();
  }, []);

  useEffect(() => {
    const filtered = bikesData.filter((bike) => {
      return (
        bike.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        bike.stolen_location.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredBikesData(filtered);
  }, [searchInput]);

  function handlePageChange(mode: string) {
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
    <div className="bg-gray-100 pb-6">
      <section className="fixed flex justify-center flex-col items-center w-full bg-gray-100 py-4">
        <h1 className="font-bold text-3xl">Stolen Bikes Reports</h1>
        <a className="text-blue-600 block mt-4 underline" href="/map">
          View stolen bikes map
        </a>
        <input
          className="bg-gray-800 border-none rounded px-6 py-3 mt-4  placeholder-gray-500 text-gray-300"
          placeholder="Search for bikes titles or locations"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {!isLoading && (
          <div className="mt-6">
            <button onClick={() => handlePageChange("previous")}>
              Previous
            </button>
            <span className="mx-8">
              Page <span className="font-bold">{page}</span> of <span className="font-bold">{Math.ceil(filteredBikesData.length / 10)}</span>
            </span>
            <button onClick={() => handlePageChange("next")}>Next</button>
          </div>
        )}
      </section>
      <div className="pt-52 max-w-3xl m-auto">
        {isLoading ? (
          <h2 className="text-center font-bold">Loading...</h2>
        ) : (
          filteredBikesData.length > 0 &&
          filteredBikesData.map((bike, i) => {
            if (i >= (page - 1) * 10 && i < page * 10)
              return <BikeCard data={bike} key={i} />;
          })
        )}
      </div>
    </div>
  );
}

export default Home;
