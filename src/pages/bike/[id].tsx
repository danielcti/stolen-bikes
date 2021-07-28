import { format } from "date-fns";
import api from "../../services/api";
import { useRouter } from "next/router";

export default function Bike({ bike }: any) {
  const router = useRouter();
  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }
  return (
    <div className="max-w-3xl m-auto py-5">
      {bike && (
        <>
          <a className="cursor-pointer underline text-blue-500" onClick={() => router.back()}>
            Back
          </a>
          <h2 className="text-center font-bold text-3xl py-4">{bike?.title}</h2>
          {bike?.large_img ? (
            <img
              src={bike?.large_img}
              className="object-cover rounded-xl w-full h-auto"
            />
          ) : (
            <img
              src="/default_bike.jpeg"
              className="object-cover rounded-xl w-full h-auto"
            />
          )}
          <div className="my-4">
            {bike.stolen_location && (
              <h3 className="mt-3 font-medium">
                Location: {bike.stolen_location}
              </h3>
            )}
            {bike.description && (
              <h3 className="mt-3 font-medium">
                Bike description: {bike.description}
              </h3>
            )}
            {bike.stolen_record?.theft_description && (
              <h3 className="mt-3 font-medium">
                Theft description: {bike.stolen_record?.theft_description}
              </h3>
            )}
            {bike.frame_colors && (
              <h3 className="mt-3 font-medium">
                Frame colors: {bike.frame_colors[0]}
              </h3>
            )}
            {bike.date_stolen && (
              <h3 className="mt-3 font-medium">Date: {formatDate(bike.date_stolen)}</h3>
            )}
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
