"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { getFormatPrice } from "@/lib/get-format-price";

interface SumContentProps extends React.HTMLAttributes<HTMLDivElement> {
  close?: () => void;
}

const SumComponent: React.FC<SumContentProps> = ({ close }) => {
  const router = useRouter();
  const { items } = useCart();

  const total = items.reduce(
    (summ, item) => summ + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (items.length) {
      router.push("/checkout");
      close && close();
    }
  };

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Итог</p>
        <p>{getFormatPrice(total)}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Доставка и налоги будут рассчитаны при оформлении заказа.
      </p>
      <div className="mt-6">
        <Button
          disabled={!items.length}
          onClick={handleSubmit}
          className="w-full"
          size="lg"
        >
          Оформить заказ
        </Button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          или{" "}
          <button
            onClick={close}
            className="font-medium text-brand hover:text-brand/80"
          >
            Продолжить покупки
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default SumComponent;
