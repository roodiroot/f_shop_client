import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import FormFilter from "../desctop/filter-form";

import { Filters } from "@/types/filters";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FilterMobilFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (value: boolean) => void;
  dataFilters?: Filters;
}

const FilterMobilForm: React.FC<FilterMobilFormProps> = ({
  dataFilters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) => {
  return (
    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
      <SheetContent className=" overflow-auto">
        <div className="relative flex h-full flex-col overflow-y-auto bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <SheetHeader className="p-0">
                <SheetTitle className="text-lg font-medium text-gray-900">
                  Фильтры
                </SheetTitle>
                <SheetDescription className="sr-only" />
                <div className="absolute top-0 right-0 py-2 sm:py-0">
                  <SheetClose className="relative text-gray-400 hover:text-gray-500 p-4 sm:p-6">
                    <XMarkIcon className="size-6" />
                  </SheetClose>
                </div>
              </SheetHeader>
            </div>
            <FormFilter
              dataFilters={dataFilters}
              className="mt-4 border-t border-gray-200 py-6"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMobilForm;
