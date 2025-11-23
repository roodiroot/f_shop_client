"use client";

import { useMobilMenu } from "@/hooks/use-mobil-menu";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Burger = () => {
  const { open } = useMobilMenu();

  return (
    <button
      type="button"
      onClick={open}
      className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
    >
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open menu</span>
      <Bars3Icon aria-hidden="true" className="size-6" />
    </button>
  );
};

export default Burger;
