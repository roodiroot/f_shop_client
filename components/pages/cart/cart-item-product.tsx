import Link from "next/link";
import Image from "next/image";

import { TrashIcon } from "@heroicons/react/20/solid";
import { getFormatPrice } from "@/lib/get-format-price";

import CircleColor from "./circle-color";
import ChangeQuantityCounter from "./change-quantity-counter";

interface CartItemProductProps extends React.HTMLAttributes<HTMLDivElement> {
  documentId: string;
  slug: string;
  imageUrl: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  stock: number;
  updateItemQuantity?: (documentId: string, quantity: number) => void;
  removeFromCart: (value: string) => void;
  close: () => void;
}

const CartItemProduct: React.FC<CartItemProductProps> = ({
  documentId,
  slug,
  imageUrl,
  name,
  size,
  price,
  color,
  quantity,
  stock,
  updateItemQuantity,
  removeFromCart,
  close,
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
            <h3 className="flex gap-3 items-center">
              <Link onClick={close} href={`/product/${slug}`}>
                {name}
              </Link>
              <CircleColor color={color} className="mt-1" />
            </h3>
            <p className="ml-4">{getFormatPrice(price * quantity)}</p>
          </div>
          <p className="mt-1 text-xs text-gray-500">Размер: {size}</p>
        </div>
        <div className="flex-1 flex items-end justify-between">
          {stock && stock > 0 ? (
            <ChangeQuantityCounter
              stock={stock}
              quantity={quantity}
              variantId={documentId}
              updateItemQuantity={updateItemQuantity}
            />
          ) : (
            <div className="text-sm text-gray-900 font-medium">
              Товар закончился!
            </div>
          )}

          <TrashIcon
            onClick={() => removeFromCart(documentId)}
            className="cursor-pointer size-5 transition-colors text-gray-400 hover:text-gray-300"
          />
        </div>
      </div>
    </li>
  );
};

export default CartItemProduct;
