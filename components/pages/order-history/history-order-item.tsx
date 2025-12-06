import { Order } from "@/types/order";
import { getFormatPrice } from "@/lib/get-format-price";

import ListComponentOrder from "./list-component-order";

interface HistoryOrderItemProps extends React.HTMLAttributes<HTMLDivElement> {
  order: Order;
}

const HistoryOrderItem: React.FC<HistoryOrderItemProps> = ({ order }) => {
  const date = new Date(order.createdAt);
  const formatted = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="border rounded-md shadow-xs bg-white">
      <div className="flex items-center border-b p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div>
            <dt className="font-medium text-neutral-800">Order number</dt>
            <dd className="mt-1 text-neutral-400">{order.id}</dd>
          </div>
          <div className="hidden sm:block">
            <dt className="font-medium text-neutral-800">Date placed</dt>
            <dd className="mt-1 text-neutral-400">
              <time dateTime={new Date(date).toISOString().split("T")[0]}>
                {formatted}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-neutral-800">Total amount</dt>
            <dd className="mt-1 text-neutral-800 font-medium">
              {getFormatPrice(Number(order.totalPrice))}
            </dd>
          </div>
        </dl>
        <div className="flex justify-end lg:hidden"></div>
        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end">
          <button className="cursor-pointer flex items-center justify-center rounded-md border bg-white px-2.5 py-2 text-sm font-medium text-neutral-700 shadow-xs">
            View Order
          </button>
        </div>
      </div>
      <ListComponentOrder orderItems={order.order_items} />
    </div>
  );
};

export default HistoryOrderItem;
