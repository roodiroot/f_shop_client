import { useCart } from "@/hooks/use-cart";
import { getFormatPrice } from "@/lib/get-format-price";

const SumComponent = () => {
  const total = useCart((state) =>
    state.items.reduce((summ, item) => summ + item.price * item.quantity, 0)
  );
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
        <a
          href="#"
          className="flex items-center justify-center rounded-md border border-transparent bg-brand px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-brand/80"
        >
          Оформить заказ
        </a>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          или{" "}
          <button
            type="button"
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
