import { GET_CATEGORY_BY_SLUG } from "@/graphql/category";
import client from "@/lib/apollo-client";
import { CategoryDocumentIdType } from "@/types/category";
import { ApiResult } from "./types";
import { Filters } from "@/types/filters";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

export const getFiltersByCategory = async (
  categoryId = "123"
): Promise<ApiResult<Filters>> => {
  try {
    const res = await fetch(`${API_URL}/api/filters/${categoryId}`);
    const data = await res.json();

    if (!data?.filters) {
      return {
        ok: false,
        error: "Пустой ответ от сервера ",
      };
    }

    return {
      ok: true,
      data: data.filters,
    };
  } catch (error) {
    console.error("getFiltersByCategory", error);
    return {
      ok: false,
      error: "Не удалось загрузить фильтры. Попробуйте позже.",
    };
  }
};
