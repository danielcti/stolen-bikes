import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import Bike from "../utils/Bike";
import { useEffect, useMemo, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import styles from "./BikeCard.module.css";

interface BikeProps {
  data: Bike;
  openDeleteModal(id: string): void;
  openEditModal(id: string): void;
}

function BikeCard({ data, openDeleteModal, openEditModal }: BikeProps) {
  const { user } = useAuth();
  const [author, setAuthor] = useState<any>();
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

  useEffect(() => {
    async function fetchAuthorData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${data.user_id}`
      );
      setAuthor(response.data);
    }
    fetchAuthorData();
  }, []);

  return (
    <figure className="md:flex bg-gray-950 rounded-xl p-8 md:p-0 mt-6 border-none cursor-pointer">
      <Link href={`/bike/${data._id}`}>
        <div className={styles.unsetImg}>
          <Image
            src={data.large_img}
            layout="fill"
            objectFit="cover"
            className={styles.customImg}
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between py-6 w-3/4 px-6">
        {author && (
          <Link href={`/bike/${data._id}`}>
            <div className="flex items-center mb-6">
              <Image
                className="rounded-full"
                src={author?.avatar}
                height="50"
                width="50"
              />
              <h2 className="text-lg mx-4 font-bold text-indigo-50">
                {author?.name}
              </h2>
            </div>
          </Link>
        )}
        <Link href={`/bike/${data._id}`}>
          <h2 className="text-lg font-bold text-red-500">{data.title}</h2>
        </Link>
        {user?.id === data.user_id && (
          <div className="flex my-6">
            <button
              onClick={handleOpenDeleteModal}
              className="border-none rounded-md bg-red-500 text-indigo-50 py-3 px-3 width-fit-content hover:bg-red-400"
            >
              <FaTrashAlt />
            </button>
            <button
              onClick={handleOpenEditModal}
              className="border-none rounded-md bg-blue-500 text-indigo-50 py-3 px-3 width-fit-content hover:bg-blue-400 ml-8"
            >
              <FaEdit />
            </button>
          </div>
        )}
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
