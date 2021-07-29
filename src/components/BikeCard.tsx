import { format } from "date-fns";
import Link from 'next/link';
import Image from 'next/image';
import Bike from '../utils/Bike';
import {useMemo} from 'react';

interface BikeProps {
  data: Bike;
}

function BikeCard({ data }: BikeProps) {
  const memoizedValue = useMemo(() => formatDate(data.date_stolen), [data.date_stolen]);

  function formatDate(unix_timestamp: number) {
    const date = new Date(unix_timestamp * 1000);
    return format(date, "dd/MM/yyyy 'at' HH:mm");
  }
  return (
    <Link href={`/bike/${data.id}`}>
      <figure className="md:flex bg-gray-950 rounded-xl p-8 md:p-0 mt-6 border-none cursor-pointer">
        <div className="w-48 h-48 relative">
          {data.large_img ? (
            <Image
              src={data.large_img}
              layout="fill"
              objectFit='cover'
              className="rounded-l-xl"
            />
          ) : (
            <Image
              src="/default_bike.jpeg"
              layout="fill"
              objectFit='cover'
              className="rounded-l-xl"
            />
          )}
        </div>
        <div className="flex flex-col justify-between py-6 w-3/4 px-6">
          <h2 className="text-lg font-bold text-red-500">{data.title}</h2>
          <div className="text-lg text-indigo-50">
            <h3 className="mb-4">{data.stolen_location}</h3>
            {data.date_stolen && (
              <h4 className="">{memoizedValue}</h4>
            )}
          </div>
        </div>
      </figure>
    </Link>
  );
}

export default BikeCard;
