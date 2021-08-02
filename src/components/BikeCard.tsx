import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import Bike from "../utils/Bike";
import { useMemo } from "react";

interface BikeProps {
  data: Bike;
  openDeleteModal(id: string): void;
  openEditModal(id: string): void;
}

function BikeCard({ data, openDeleteModal, openEditModal }: BikeProps) {
  const memoizedValue = useMemo(
    () => formatDate(data.date_stolen),
    [data.date_stolen]
  );

  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }

  function handleOpenDeleteModal() {
    openDeleteModal(data._id);
  }

  function handleOpenEditModal() {
    openEditModal(data._id);
  }

  return (
    <figure className="md:flex bg-gray-950 rounded-xl p-8 md:p-0 mt-6 border-none cursor-pointer">
      <Link href={`/bike/${data._id}`}>
        <div className="w-48 h-48 relative">
          {data.large_img ? (
            <Image
              src={data.large_img}
              layout="fill"
              objectFit="cover"
              className="rounded-l-xl"
            />
          ) : (
            <Image
              src="/default_bike.jpeg"
              layout="fill"
              objectFit="cover"
              className="rounded-l-xl"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-between py-6 w-3/4 px-6">
        <Link href={`/bike/${data._id}`}>
          <h2 className="text-lg font-bold text-red-500">{data.title}</h2>
        </Link>
        <div className="flex">
          <button
            onClick={handleOpenDeleteModal}
            className="border-none rounded-md bg-red-500 text-indigo-50 py-2 px-4 width-fit-content hover:bg-red-400"
          >
            Delete bike thief
          </button>
          <button
            onClick={handleOpenEditModal}
            className="border-none rounded-md bg-blue-500 text-indigo-50 py-2 px-4 width-fit-content hover:bg-blue-400 ml-5"
          >
            Edit bike thief
          </button>
        </div>
        <div className="text-lg text-indigo-50">
          <Link href={`/bike/${data._id}`}>
            <h3 className="mb-4">{data.stolen_location}</h3>
          </Link>
          <Link href={`/bike/${data._id}`}>
            {data.date_stolen && <h4 className="">{memoizedValue}</h4>}
          </Link>
        </div>
      </div>
    </figure>
  );
}

export default BikeCard;
