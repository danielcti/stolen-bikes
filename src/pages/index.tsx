import { useState, useEffect } from "react";
import BikeCard from "../components/BikeCard";
import Link from "next/link";
import Pagination from "../components/Pagination";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import CreateOrEditModal from "../components/CreateOrEditModal";
import Bike from '../utils/Bike';

export default function Home({ bikesData }: any) {
  const [allBikesData, setAllBikesData] = useState<Bike[]>([]);
  const [filteredBikesData, setFilteredBikesData] = useState<Bike[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [removingId, setRemovingId] = useState("");
  const [editingId, setEditingId] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  useEffect(() => {
    setAllBikesData(bikesData);
  }, []);

  useEffect(() => {
    setFilteredBikesData(allBikesData);
  }, [allBikesData]);

  useEffect(() => {
    const filtered = allBikesData.filter((bike: any) => {
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

  function openDeleteModal(id: string) {
    setRemovingId(id);
    setDeleteModalIsOpen(true);
  }

  function openCreateModal(id?: string) {
    if(id){
      setEditingId(id);
      setIsCreate(false);
    } else {
      setEditingId("");
      setIsCreate(true);
    }
    setCreateModalIsOpen(true);
  }

  async function updateList() {
    const response = await axios.get("http://localhost:3000/api/bikes");
    setAllBikesData(response.data);
  }

  return (
    <>
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
          <button className="bg-green-600 hover:bg-green-400 px-4 py-2 mt-4 rounded-md text-indigo-50" onClick={() => openCreateModal()}>
            Report a new bike thief
          </button>
          <Pagination
            page={page}
            changePage={handlePageChange}
            length={filteredBikesData?.length}
          />
        </section>
        <div className="pt-52 max-w-3xl m-auto">
          {filteredBikesData?.length > 0 &&
            filteredBikesData.map((bike: any, i: number) => {
              if (i >= (page - 1) * 10 && i < page * 10)
                return (
                  <BikeCard
                    data={bike}
                    key={i}
                    openEditModal={openCreateModal}
                    openDeleteModal={openDeleteModal}
                  />
                );
            })}
        </div>
      </div>
      <DeleteModal
        id={removingId}
        modalIsOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        updateList={updateList}
      />
      <CreateOrEditModal
        isCreate={isCreate}
        modalIsOpen={createModalIsOpen}
        setIsOpen={setCreateModalIsOpen}
        updateList={updateList}
        payload={allBikesData.filter(bike => bike._id === editingId)[0]}
      />
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/bikes", {
    params: {
      per_page: 100,
      stolenness: "stolen",
    },
  });

  return {
    props: {
      bikesData: response.data,
    },
  };
};
