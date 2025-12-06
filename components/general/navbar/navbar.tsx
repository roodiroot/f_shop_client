import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import client from "@/lib/apollo-client";

import Burger from "./burger";
import Menu from "./menu";
import MobilMenu from "../mobil-menu/mobil-menu";

import { GET_CATEGORIES_ROOT } from "@/graphql/category";
import { CategoryRootType } from "@/types/category";
import CartNavbar from "./cart-navbar";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import PermisionComponent from "./permision-component";

const Navbar = async () => {
  const { data: dataCategories } = await client.query<{
    categories: CategoryRootType[];
  }>({
    query: GET_CATEGORIES_ROOT,
    variables: {
      filters: {
        parent: {
          documentId: null,
        },
      },
      productSort: ["createdAt:desc"],
    },
    fetchPolicy: "no-cache",
  });

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobilMenu dataCategories={dataCategories?.categories} />

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-neutral-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Бесплатная доставка при заказе от 7000 ₽!
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <Burger />

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <Icons.Logo className="size-12" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Menu dataCategories={dataCategories?.categories} />

              <div className="ml-auto flex items-center">
                <PermisionComponent />

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <CartNavbar />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
