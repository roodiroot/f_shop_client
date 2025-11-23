import { Accordion } from "radix-ui";

import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Filters } from "@/types/filters";
import { prepareFilters } from "@/lib/prepare-filters";

import { useFilterParams } from "@/hooks/use-filters-param";
import { cn } from "@/lib/utils";

interface FormFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  dataFilters?: Filters;
}

const FormFilter: React.FC<FormFilterProps> = ({ dataFilters, className }) => {
  const { toggleParam, isChecked } = useFilterParams();

  const filtersList = prepareFilters(dataFilters);

  return (
    <form className={cn("block", className)}>
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className="space-y-4 border-b border-gray-200 pb-6 font-medium text-gray-900"
      >
        {dataFilters?.categoryParam?.map((category) => {
          const checked = isChecked("categoryParam", category);
          return (
            <li
              className={cn(checked && "font-bold", "cursor-pointer")}
              onClick={() => toggleParam("categoryParam", category)}
              key={category}
            >
              <span>{category}</span>
            </li>
          );
        })}
      </ul>
      <Accordion.Root type="single" defaultValue="color" collapsible>
        {filtersList?.map((section) => (
          <Accordion.Item
            key={section.id}
            value={section.id}
            className="border-b border-gray-200 py-6"
          >
            <Accordion.Header className="-my-3 flow-root">
              <Accordion.Trigger className="group flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>

                <span className="ml-6 flex items-center">
                  <PlusIcon className="size-5 group-data-[state=open]:hidden group-data-[state=closed]:block" />
                  <MinusIcon className="size-5 group-data-[state=open]:block group-data-[state=closed]:hidden" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="pt-6 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="space-y-4">
                {section.items.map((option: string) => {
                  const checked = isChecked(section.id, option);
                  const inputId = `filter-${section.id}-${option}`;

                  return (
                    <div key={option} className="flex gap-3">
                      <div className="flex h-5 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleParam(section.id, option)}
                            className="col-start-1 row-start-1 appearance-none rounded-xs border border-gray-300 bg-white checked:border-brand checked:bg-brand"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={checked ? "opacity-100" : "opacity-0"}
                            />
                          </svg>
                        </div>
                      </div>

                      <label
                        htmlFor={inputId}
                        className="text-gray-600 cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </form>
  );
};

export default FormFilter;
