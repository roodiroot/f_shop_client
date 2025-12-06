import { Filters } from "@/types/filters";

export function prepareFilters(filters?: Filters) {
  if (!filters) return;
  const map: Record<string, string> = {
    gender: "Пол",
    color: "Цвет",
    topBottom: "Тип одежды",
    rise: "Посадка",
    season: "Сезон",
    seasonality: "Сезонность",
    composition: "Состав",
    denomination: "Номинал",
    categoryParam: "Категории",
  };

  const sections = Object.entries(filters)
    .filter(([_, value]) => Array.isArray(value))
    .map(([key, value]) => ({
      id: key,
      name: map[key] || key,
      items: value,
    }))
    .filter((section) => section.items.length > 0);

  // if (
  //   typeof filters.minPrice === "number" &&
  //   typeof filters.maxPrice === "number"
  // ) {
  //   sections.push({
  //     id: "price",
  //     name: "Цена",
  //     items: [filters.minPrice, filters.maxPrice],
  //   });
  // }

  return sections.filter((value) => value.items.length > 1);
}
