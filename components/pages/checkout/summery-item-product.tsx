import Link from "next/link";
import Image from "next/image";

import { TrashIcon } from "@heroicons/react/20/solid";
import { getFormatPrice } from "@/lib/get-format-price";

interface SummeryItemProductProps extends React.HTMLAttributes<HTMLDivElement> {
  documentId: string;
  slug: string;
  imageUrl: string;
  name: string;
  price: number;
  color: string;
  quantity: number;
  removeFromCart: (value: string) => void;
}

const SummeryItemProduct: React.FC<SummeryItemProductProps> = ({
  documentId,
  slug,
  imageUrl,
  name,
  price,
  color,
  quantity,
  removeFromCart,
}) => {
  return (
    <li className="flex py-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          width={94}
          height={94}
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
            <p className="ml-4">{getFormatPrice(price * quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Шт. {quantity}</p>

          <div className="flex">
            <TrashIcon
              onClick={() => removeFromCart(documentId)}
              className="cursor-pointer size-5 transition-colors text-neutral-400 hover:text-neutral-300"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SummeryItemProduct;
