import { getFormatPrice } from "@/lib/get-format-price";

interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPrice: number;
  count: number;
}
const Summary: React.FC<SummaryProps> = ({ totalPrice, count }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-md">
      <dl className="text-sm text-gray-500 font-medium space-y-6">
        <div className="flex justify-between">
          <dt>Стоимость товаров</dt>
          <dd className="text-gray-800">{getFormatPrice(totalPrice)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Колличество товаров</dt>
          <dd className="text-gray-800">{count}</dd>
        </div>
        <div className="flex justify-between border-t pt-6 text-gray-800">
          <dt className="text-base">Итого</dt>
          <dd className="text-base">{getFormatPrice(totalPrice)}</dd>
        </div>
      </dl>
    </div>
  );
};

export default Summary;
