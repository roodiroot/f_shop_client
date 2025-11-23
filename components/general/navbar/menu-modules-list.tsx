"use client";

import Link from "next/link";

import { ShortProductType } from "@/types/products";
import CardNavigationItem from "./card-navigatin-item";
import { CategoryRootType } from "@/types/category";

interface MenuModulesListProps extends React.HTMLAttributes<HTMLDivElement> {
  category?: CategoryRootType;
  products?: ShortProductType[];
  setOpenPopover?: (value: string | null) => void;
}
const MenuModulesList: React.FC<MenuModulesListProps> = ({
  products,
  category,
  setOpenPopover,
}) => {
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-10 py-16 ">
      {/* Вывод популярных товаров */}
      <div className="col-span-2 grid grid-cols-3 gap-x-8 ">
        {products?.map((item: ShortProductType) => (
          <CardNavigationItem
            key={item.documentId}
            product={item}
            setOpenPopover={setOpenPopover}
          />
        ))}
      </div>

      {/* Вывод списка подкатегорий */}
      <div className="row-start-1 grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
        <div>
          <p className="font-medium text-gray-900">
            <Link
              onClick={() => (setOpenPopover ? setOpenPopover(null) : null)}
              href={`/catalog/${category?.slug}`}
            >
              {category?.name}
            </Link>
          </p>
          <ul role="list" className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
            {category?.children.map((item) => (
              <li key={item.documentId} className="flex">
                <Link
                  onClick={() => (setOpenPopover ? setOpenPopover(null) : null)}
                  href={"/catalog/" + category.slug + "/" + item.slug}
                  className="hover:text-gray-800"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuModulesList;
