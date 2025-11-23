"use client";

import { useCart } from "@/hooks/use-cart";
import { useCartModalOpen } from "@/hooks/use-cart-modal-open";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const CartNavbar = () => {
  const { open } = useCartModalOpen();
  const { items } = useCart();
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <div
        onClick={open}
        className="cursor-pointer group -m-2 flex items-center p-2"
      >
        <ShoppingBagIcon
          aria-hidden="true"
          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {items.length}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </div>
    </div>
  );
};

export default CartNavbar;
