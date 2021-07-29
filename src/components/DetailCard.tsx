interface DetailCardProps {
  detailTitle: string;
  detailDescription: string;
}

function DetailCard({ detailTitle, detailDescription }: DetailCardProps) {
  return (
    <li className="bg-gray-950 px-6 pt-4 pb-6 mb-10">
    <h3 className="text-red-500 uppercase font-bold text-2xl mb-6">
      {detailTitle}
    </h3>
    <p className="text-2xl mb-5">{detailDescription}</p>
  </li>
  );
}

export default DetailCard;
