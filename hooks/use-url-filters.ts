import { useSearchParams } from "next/navigation";

export function useUrlFilters() {
  const params = useSearchParams();

  const filters: Record<string, string[]> = {};

  params.forEach((value, key) => {
    if (!filters[key]) filters[key] = [];
    filters[key].push(value);
  });

  return filters;
}
