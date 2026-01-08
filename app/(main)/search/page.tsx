"use client";
import SearchList from "@/components/pages/search/search-list";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { useProduct } from "@/hooks/query/use-product";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

const SearchPage = () => {
  const [value, setValue] = useState<string>("");

  const query = value.trim();
  const debouncedQuery = useDebouncedValue(query, 150);

  const skip = debouncedQuery.length < 2;

  const filters = useMemo(() => {
    if (skip) return {};
    return {
      or: [
        { shortName: { containsi: debouncedQuery } },
        { subcategory: { containsi: debouncedQuery } },
        { waist: { containsi: debouncedQuery } },
        { categoryParam: { containsi: debouncedQuery } },
      ],
    };
  }, [debouncedQuery, skip]);

  const { productsList, loading, error, pageInfo } = useProduct({
    filters,
    skip,
    pagination: { page: 1, pageSize: 12 },
    sort: ["createdAt:desc"],
  });

  const searchTitle = loading
    ? "Поиск…"
    : debouncedQuery.length === 0
    ? "Начните ввод"
    : debouncedQuery.length < 2
    ? "Продолжите ввод"
    : productsList.length > 0
    ? "Результаты"
    : "Совпадений не найдено";

  const clearSearch = () => {
    setValue("");
  };
  return (
    <Container className="pt-0 sm:pt-0 lg:pt-0">
      <div className="pt-16 pb-6">
        <div>
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="relative max-w-lg ">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Введите запрос"
                autoFocus
              />
              <div
                onClick={clearSearch}
                className="absolute top-1/2 right-0 p-1 -translate-y-1/2 flex justify-center items-center"
              >
                <X className={cn(query ? "text-gray-500" : "text-gray-200")} />
              </div>
            </div>
            <p className="mt-4 text-xl font-bold tracking-tight text-gray-900">
              {searchTitle}
            </p>
          </div>
          <SearchList
            productsList={productsList}
            loading={loading}
            pageInfo={pageInfo}
            error={error}
          />
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
