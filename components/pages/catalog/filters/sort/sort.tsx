import { cn } from "@/lib/utils";
import { DropdownMenu } from "radix-ui";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useFilterParams } from "@/hooks/use-filters-param";

const sortOptions = [
  { label: "По умолчанию", value: "default" },
  { label: "Сначала дешевые", value: "product_variants.price:asc" },
  { label: "Сначала дорогие", value: "product_variants.price:desc" },
  { label: "Сначала новые", value: "createdAt:desc" },
];

const Sort = () => {
  const { setSort, getSort } = useFilterParams();
  const currentSort = getSort();

  return (
    <DropdownMenu.Root>
      <div className="relative inline-block text-left">
        <DropdownMenu.Trigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Сортировка
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <div className="py-1">
              {sortOptions.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  onSelect={() => setSort(option.value)}
                  className={cn(
                    "cursor-pointer block px-4 py-2 text-sm data-[highlighted]:bg-gray-50",
                    currentSort === option.value
                      ? "font-medium text-gray-900"
                      : "text-gray-500"
                  )}
                >
                  {option.label}
                </DropdownMenu.Item>
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
};

export default Sort;
