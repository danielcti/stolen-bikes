import DetailCard from "./DetailCard";
import Bike from "../utils/Bike";
import { format } from "date-fns";

interface DetailsListProps {
  bike: Bike;
}

function DetailsList({ bike }: DetailsListProps) {
  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }
  return (
    <div className="my-4">
      <h3 className="font-bold text-3xl uppercase">Informations</h3>
      <ul className="mt-10">
        {bike.stolen_location && (
          <DetailCard
            detailTitle="Location"
            detailDescription={bike.stolen_location}
          />
        )}
        {bike.frame_colors && (
          <DetailCard
            detailTitle="Frame colors"
            detailDescription={bike.frame_colors}
          />
        )}
        {bike.date_stolen && (
          <DetailCard
            detailTitle="Date"
            detailDescription={formatDate(bike.date_stolen)}
          />
        )}
      </ul>
    </div>
  );
}

export default DetailsList;
