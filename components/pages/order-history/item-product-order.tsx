import Link from "next/link";
import Image from "next/image";

import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { getFormatPrice } from "@/lib/get-format-price";
import { statusMap } from "@/lib/status-order";

interface ItemProductOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  status: "waiting_for_payment" | "paid" | "shipped" | "canceled";
  updatedStatus: string;
}

const ItemProductOrder: React.FC<ItemProductOrderProps> = ({
  slug,
  imageUrl,
  name,
  price,
  color,
  quantity,
  status,
  updatedStatus,
}) => {
  const date = new Date(updatedStatus);
  const formatted = date?.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <li className="p-4 sm:p-6 border-b last:border-0">
      <div className="flex items-center sm:items-start">
        <div className="w-30 aspect-[1/1.3] shrink-0 overflow-hidden rounded-md border border-gray-200">
          <Image
            width={160}
            height={160}
            alt={name + "_image"}
            src={imageUrl}
            className="size-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <Link href={`/product/${slug}`}>{name}</Link>
              </h3>
              <p className="ml-4 text-sm">{getFormatPrice(price * quantity)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{color}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500">Шт. {quantity}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:flex sm:justify-between">
        <div className="flex justify-start items-center">
          <CheckCircleIcon className="size-5 text-green-400" />
          <p className="ml-2 text-sm font-medium text-neutral-500">
            {statusMap[status]} <time dateTime="2021-07-12">{formatted}</time>
          </p>
        </div>
        <div className="mt-6 flex items-center border-t pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
          <div className="flex flex-1 justify-center pr-4 border-r">
            <a href="" className="whitespace-nowrap text-brand">
              View product
            </a>
          </div>
          <div className="flex flex-1 justify-center pl-4">
            <a href="" className="whitespace-nowrap text-brand">
              Buy again
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ItemProductOrder;
