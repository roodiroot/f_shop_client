"use client";

import Link from "next/link";

import CardNavigationItem from "./card-navigatin-item";

import { ShortProductType } from "@/types/products";
import { CategoryRootType } from "@/types/category";

interface MenuProductListProps extends React.HTMLAttributes<HTMLDivElement> {
  category?: CategoryRootType;
  products?: ShortProductType[];
  setOpenPopover?: (value: string | null) => void;
}
const MenuProductList: React.FC<MenuProductListProps> = ({
  category,
  products,
  setOpenPopover,
}) => {
  return (
    <div className="py-16 ">
      <div className="mb-10">
        <Link
          href={`/catalog/${category?.slug}`}
          onClick={() => (setOpenPopover ? setOpenPopover(null) : null)}
          className="font-medium text-gray-900 mb-10"
        >
          {category?.name}
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-10">
        {products?.map((item: ShortProductType) => (
          <CardNavigationItem
            key={item.documentId}
            product={item}
            setOpenPopover={setOpenPopover}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuProductList;
