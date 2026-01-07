"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import MenuProductList from "./menu-product-list";
import MenuModulesList from "./menu-modules-list";

import { ShortProductType } from "@/types/products";
import { CategoryRootType } from "@/types/category";

import Link from "next/link";
import { headerNavigation } from "@/config/navigation";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  dataCategories?: CategoryRootType[];
}

const Menu: React.FC<MenuProps> = ({ dataCategories }) => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  return (
    <div className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {dataCategories?.map((category) => {
          const products: ShortProductType[] = [];
          let count = 0;
          for (const child of category.children) {
            if (count >= 3) break;
            products.push(...child.products);
            count++;
          }

          return (
            <Popover
              key={category.name}
              open={openPopover === category.slug}
              onOpenChange={(isOpen) =>
                setOpenPopover(isOpen ? category.slug : null)
              }
            >
              <div className="relative flex">
                <div className="relative flex">
                  <PopoverTrigger className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                    {category.name}
                    <span className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600" />
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-screen overflow-y-auto text-sm text-gray-500">
                  <div className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      {products.length > 0 ? (
                        <MenuModulesList
                          category={category}
                          products={products}
                          setOpenPopover={setOpenPopover}
                        />
                      ) : (
                        <MenuProductList
                          category={category}
                          products={category.products}
                          setOpenPopover={setOpenPopover}
                        />
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </div>
            </Popover>
          );
        })}
        {headerNavigation.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
