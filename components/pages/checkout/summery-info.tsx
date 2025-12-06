"use client";

import { useCart } from "@/hooks/use-cart";
import { getFormatPrice } from "@/lib/get-format-price";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const SummeryInfo = () => {
  const { items } = useCart();

  const total = items.reduce(
    (summ, item) => summ + item.price * item.quantity,
    0
  );

  if (!total) {
    return (
      <div className="self-center w-full py-10">
        <div className="mx-auto">
          <ShoppingBagIcon className="size-10 mx-auto text-neutral-300 " />
          <div className="text-center text-neutral-600 mt-6">
            Ваша корзина пока пуста
          </div>
        </div>
      </div>
    );
  }

  return (
    <dl className="mt-10 text-sm text-neutral-500 font-medium space-y-6">
      <div className="flex justify-between">
        <dt>Стоимость товаров</dt>
        <dd className="text-neutral-800">{getFormatPrice(total)}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Колличество товаров</dt>
        <dd className="text-neutral-800">{items.length}</dd>
      </div>
      <div className="flex justify-between">
        <dt>Доставка</dt>
        <dd className="text-neutral-800">Будет рассчитана после оформления</dd>
      </div>
      <div className="flex justify-between border-t pt-6 text-neutral-800">
        <dt className="text-base">Итого</dt>
        <dd className="text-base">{getFormatPrice(total)}</dd>
      </div>
    </dl>
  );
};

export default SummeryInfo;
