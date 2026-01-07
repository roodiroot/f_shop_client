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
import { headerNavigation } from "@/config/navigation";

interface MobilMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  dataCategories?: CategoryRootType[];
}

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
          {headerNavigation.map((page) => (
            <div key={page.name} className="flow-root">
              <Link
                href={page.href}
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                {page.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
          <div className="flow-root">
            <Link
              href="/login"
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              Логин
            </Link>
          </div>
          <div className="flow-root">
            <Link
              href="/register"
              className="-m-2 block p-2 font-medium text-gray-900"
            >
              Создать акаунт
            </Link>
          </div>
        </div>
        <SheetFooter className="sr-only"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobilMenu;
