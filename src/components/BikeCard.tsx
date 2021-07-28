import { format } from "date-fns";

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

interface BikeProps {
  data: Bike;
}

function BikeCard({ data }: BikeProps) {
  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }
  return (
    <a href={`/bike/${data.id}`}>
      <figure className="md:flex bg-white rounded-xl p-8 md:p-0 mt-6 border-black border-2">
        <div className="md:w-1/4">
          {data.large_img ? (
            <img
              src={data.large_img}
              className="object-cover rounded-xl h-48 w-full md:h-48 md:w-48"
            />
          ) : (
            <img
              src="/default_bike.jpeg"
              className="object-cover rounded-xl h-48 w-full md:h-48 md:w-48"
            />
          )}
        </div>
        <div className="flex flex-col justify-between py-6 w-3/4 px-6">
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <div className="">
            <h3 className="mb-4">{data.stolen_location}</h3>
            {data.date_stolen && (
              <h4 className="text-gray-500">{formatDate(data.date_stolen)}</h4>
            )}
          </div>
        </div>
      </figure>
    </a>
  );
}

export default BikeCard;
