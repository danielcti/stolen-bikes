import { format } from "date-fns";
import api from "../../services/api";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import styles from "./Bike.module.css";

export default function Bike({ bike }: any) {
  const router = useRouter();
  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }
  return (
    <div className="sm:max-w-2xl md:max-w-3-xl lg:max-w-4xl xl:max-w-5xl m-auto py-5 px-10 text-indigo-50">
      {bike && (
        <>
          <span
            className="lg:fixed lg:absolute lg:right-20 mb-10 block cursor-pointer underline text-indigo-50"
            onClick={() => router.back()}
          >
            <FaArrowLeft size={32} />
          </span>
          <div className={styles.unsetImg}>
            {bike?.large_img ? (
              <Image
                layout="fill"
                src={bike?.large_img}
                objectFit="cover"
                className={styles.customImg}
              />
            ) : (
              <Image
                layout="fill"
                src="/default_bike.jpeg"
                objectFit="cover"
                className={styles.customImg}
              />
            )}
          </div>
          <h2 className="font-bold text-5xl py-8 uppercase">{bike?.title}</h2>
          <div className="my-4">
            <h3 className="font-bold text-3xl uppercase">Informations</h3>
            <ul className="mt-10">
              {bike.stolen_location && (
                <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
                  <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
                    Location
                  </h3>
                  <p className="text-2xl mb-5">{bike.stolen_location}</p>
                </li>
              )}
              {bike.description && (
                <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
                  <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
                    Bike description
                  </h3>
                  <p className="text-2xl mb-5">{bike.description}</p>
                </li>
              )}
              {bike.stolen_record?.theft_description && (
                <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
                  <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
                    Theft description
                  </h3>
                  <p className="text-2xl mb-5">
                    {bike.stolen_record?.theft_description}
                  </p>
                </li>
              )}
              {bike.frame_colors && (
                <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
                  <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
                    Frame colors
                  </h3>
                  <p className="text-2xl mb-5">{bike.frame_colors[0]}</p>
                </li>
              )}
              {bike.date_stolen && (
                <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
                  <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
                    Date
                  </h3>
                  <p className="text-2xl mb-5">
                    {formatDate(bike.date_stolen)}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps = async ({ params }: any) => {
  try {
    const id = params.id;
    const response = await api.get(`/bikes/${id}`);

    return {
      props: {
        bike: response.data.bike,
      },
      notFound: false,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
