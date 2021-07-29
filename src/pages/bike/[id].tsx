import api from "../../services/api";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import styles from "./Bike.module.css";
import Bike from "../../utils/Bike";
import DetailsList from "../../components/DetailsList";

interface BikeProps {
  bike: Bike;
}

export default function BikePage({ bike }: BikeProps) {
  const router = useRouter();
  return (
    <div className="sm:max-w-2xl md:max-w-3-xl lg:max-w-4xl xl:max-w-5xl m-auto py-5 px-10 text-indigo-50">
      {bike && (
        <>
          <span
            className="lg:fixed lg:right-20 mb-10 block cursor-pointer underline text-indigo-50"
            onClick={router.back}
          >
            <FaArrowLeft size={32} />
          </span>
          <div className={styles.unsetImg}>
            {bike?.large_img ? (
              <Image
                layout="fill"
                src={bike?.large_img}
                objectFit="contain"
                className={styles.customImg}
              />
            ) : (
              <Image
                layout="fill"
                src="/default_bike.jpeg"
                objectFit="contain"
                className={styles.customImg}
              />
            )}
          </div>
          <h2 className="font-bold text-5xl py-8 uppercase">{bike?.title}</h2>
          {bike?.stolen_record.latitude && (
            <h3
              onClick={() =>
                router.push({
                  pathname: "/map",
                  query: {
                    lat: bike?.stolen_record?.latitude,
                    long: bike?.stolen_record?.longitude,
                  },
                })
              }
            >
              View on map
            </h3>
          )}
          <DetailsList bike={bike} />
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
