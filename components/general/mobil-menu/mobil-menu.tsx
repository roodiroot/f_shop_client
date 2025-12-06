"use client";

import React from "react";
import Link from "next/link";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import CardNavigationItem from "../navbar/card-navigatin-item";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMobilMenu } from "@/hooks/use-mobil-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { ShortProductType } from "@/types/products";
import { CategoryRootType } from "@/types/category";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MobilMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  dataCategories?: CategoryRootType[];
}
const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

const MobilMenu: React.FC<MobilMenuProps> = ({ dataCategories }) => {
  const { isOpen, close } = useMobilMenu();

  const defaultValue = dataCategories?.filter(
    (i) => i.products.length <= 0
  )?.[0]?.documentId;

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent
        side={"left"}
        className="lg:hidden flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl "
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Mobil menu</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
          <div className="absolute top-0 left-0 py-2 sm:py-0">
            <SheetClose className="relative text-gray-400 hover:text-gray-500 p-4 sm:p-6">
              <XMarkIcon className="size-6" />
            </SheetClose>
          </div>
        </SheetHeader>
        <Tabs defaultValue={defaultValue} className="mt-2">
          <div className="border-b border-gray-200">
            <TabsPrimitive.List className="-mb-px flex space-x-8 px-4">
              {dataCategories
                ?.filter((i) => i.products.length <= 0)
                ?.map((category) => (
                  <TabsPrimitive.TabsTrigger
                    key={category.documentId}
                    value={category.documentId}
                    className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  >
                    {category.name}
                  </TabsPrimitive.TabsTrigger>
                ))}
            </TabsPrimitive.List>
          </div>
          <div>
            {dataCategories
              ?.filter((i) => i.products.length <= 0)
              ?.map((category) => {
                const products: ShortProductType[] = [];
                let count = 0;
                for (const child of category.children) {
                  if (count >= 2) break;
                  products.push(...child.products);
                  count++;
                }
                return (
                  <TabsContent
                    value={category.documentId}
                    key={category.name}
                    className="space-y-10 px-4 pt-10 pb-8"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {products.map((item) => (
                        <CardNavigationItem
                          key={item.documentId}
                          product={item}
                          setOpenPopover={close}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {category.name}
                      </p>
                      <ul className="mt-6 flex flex-col space-y-6">
                        {category.children.map((item) => (
                          <li key={item.name} className="flow-root">
                            <Link
                              onClick={close}
                              href={`/catalog/${category.slug}/${item.slug}`}
                              className="-m-2 block p-2 text-gray-500"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {dataCategories
                      ?.filter((i) => i.products.length > 0)
                      ?.map((i) => (
                        <Link
                          key={i.documentId}
                          href={`/catalog/${i.slug}`}
                          onClick={close}
                          className="font-medium text-gray-900"
                        >
                          {i.name}
                        </Link>
                      ))}
                  </TabsContent>
                );
              })}
          </div>
        </Tabs>

        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          {navigation.pages.map((page) => (
            <div key={page.name} className="flow-root">
              <a
                href={page.href}
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                {page.name}
              </a>
            </div>
          ))}
        </div>

        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          <div className="flow-root">
            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
              Логин
            </a>
          </div>
          <div className="flow-root">
            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
              Создать акаунт
            </a>
          </div>
        </div>
        <SheetFooter className="sr-only"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobilMenu;
