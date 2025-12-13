"use client";

import { useState } from "react";

import Sort from "./filters/sort/sort";
import FormFilter from "./filters/desctop/filter-form";
import FilterMobilForm from "./filters/mobil/filter-modil-form";

import { FunnelIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Filters } from "@/types/filters";
import { Skeleton } from "@/components/ui/skeleton";

interface FiltersWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryName?: string;
  dataFilters?: Filters;
}

const FiltersWrapper: React.FC<FiltersWrapperProps> = ({
  categoryName,
  dataFilters,
  children,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        {!isDesktop && (
          <FilterMobilForm
            dataFilters={dataFilters}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        )}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
            {categoryName ? (
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pr-4">
                {categoryName}
              </h1>
            ) : (
              <Skeleton className="h-10 w-xs" />
            )}

            <div className="flex items-center">
              <Sort />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              {isDesktop && dataFilters ? (
                <FormFilter dataFilters={dataFilters} className="text-sm" />
              ) : (
                <CatSkeletArr />
              )}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FiltersWrapper;

const CatSkeletArr = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex pb-6 flex-col gap-4 ">
        {new Array(4).fill("").map((_, index) => (
          <Skeleton className="h-5" key={index} />
        ))}
      </div>
      <div className="py-6 border-y">
        <Skeleton className="h-5" />
      </div>
    </div>
  );
};
