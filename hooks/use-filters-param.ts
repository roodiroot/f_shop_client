"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function useFilterParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushParams = (params: URLSearchParams) => {
    // router.replace(`?${params.toString()}`, { scroll: false });
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const toggleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const existing = params.getAll(key);

    if (existing.includes(value)) {
      const updated = existing.filter((v) => v !== value);
      params.delete(key);
      updated.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    pushParams(params);
  };

  const setSort = (value: string, defaultValue = "default") => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (value === defaultValue) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    pushParams(params);
  };

  const isChecked = (key: string, value: string) => {
    return searchParams.getAll(key).includes(value);
  };

  const getSort = () => searchParams.get("sort");

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    pushParams(params);
  };

  const getPage = () => {
    const value = searchParams.get("page");
    return value ? Number(value) : 1;
  };

  const nextPage = (totalPages: number) => {
    const current = getPage();
    if (current < totalPages) setPage(current + 1);
  };

  const prevPage = () => {
    const current = getPage();
    if (current > 1) setPage(current - 1);
  };

  return {
    toggleParam,
    isChecked,
    setSort,
    getSort,
    getPage,
    setPage,
    nextPage,
    prevPage,
  };
}
