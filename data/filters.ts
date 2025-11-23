import { FiltersResponse } from "@/types/filters";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

export const getFilters = async (
  categoryId: string
): Promise<FiltersResponse> => {
  const data = await fetch(`${API_URL}/api/filters/${categoryId}`);
  return data.json();
};
