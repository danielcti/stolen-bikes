import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import styles from "./Bike.module.css";
import Bike from "../../utils/Bike";
import DetailsList from "../../components/DetailsList";
import axios from "axios";

interface BikeProps {
  bike: Bike;
  author: any;
}

export default function BikePage({ bike, author }: BikeProps) {
  const router = useRouter();

  return (
    <div className="sm:max-w-2xl md:max-w-3-xl lg:max-w-4xl xl:max-w-5xl m-auto py-5 px-10 text-indigo-50 pt-36">
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
          {author && (
            <div className="flex items-center mb-6 mt-20">
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
          )}
          <h2 className="font-bold text-5xl py-8 uppercase">{bike?.title}</h2>
          {bike?.latitude && (
            <h3
              className="cursor-pointer underline"
              onClick={() =>
                router.push({
                  pathname: "/map",
                  query: {
                    lat: bike?.latitude,
                    long: bike?.longitude,
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
    const { data: bike } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bikes/${id}`
    );
    const { data: author } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${bike.user_id}`
    );

    return {
      props: {
        bike,
        author,
      },
      notFound: false,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
