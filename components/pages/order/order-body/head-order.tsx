import NameOrder from "../name-order";

interface HeadOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  orderId: string;
  date: string;
}
const HeadOrder: React.FC<HeadOrderProps> = ({ orderId, date }) => {
  const dateCreate = new Date(date);
  const formatted = dateCreate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="pt-16 pb-6 flex items-end justify-between gap-4">
      <NameOrder order={orderId} />
      <div className="text-sm text-gray-500 text-end">
        Дата создания{" "}
        <time dateTime="2021-03-22" className="font-bold text-gray-900">
          {formatted}
        </time>
      </div>
    </div>
  );
};

export default HeadOrder;
