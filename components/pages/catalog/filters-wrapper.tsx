"use client";

import { useState } from "react";

import Sort from "./filters/sort/sort";
import FormFilter from "./filters/desctop/filter-form";
import FilterMobilForm from "./filters/mobil/filter-modil-form";

import { FunnelIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Filters } from "@/types/filters";

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
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {categoryName}
            </h1>

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
              {isDesktop && (
                <FormFilter dataFilters={dataFilters} className="text-sm" />
              )}
              {/* Product grid */}
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FiltersWrapper;
