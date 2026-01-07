import client from "@/lib/apollo-client";

import {
  GET_CATEGORIES_ROOT,
  GET_CATEGORIES_SHORT,
  GET_CATEGORY_BY_SLUG,
} from "@/graphql/category";
import {
  CategoryDocumentIdType,
  CategoryRootType,
  CategoryScreen,
} from "@/types/category";
import { ApiResult } from "./types";

export async function getRootCategories(): Promise<
  ApiResult<CategoryRootType[]>
> {
  try {
    const { data } = await client.query<{ categories: CategoryRootType[] }>({
      query: GET_CATEGORIES_ROOT,
      variables: {
        filters: {
          parent: {
            documentId: null,
          },
        },
        productSort: ["createdAt:desc"],
      },
      fetchPolicy: "no-cache",
    });

    if (!data?.categories) {
      return {
        ok: false,
        error: "Пустой ответ от сервера категорий",
      };
    }

    return {
      ok: true,
      data: data.categories,
    };
  } catch (error) {
    console.error("safeGetRootCategories error", error);
    return {
      ok: false,
      error: "Не удалось загрузить категории. Попробуйте позже.",
    };
  }
}

export const getChildrenCategories = async (): Promise<
  ApiResult<CategoryScreen[]>
> => {
  try {
    const { data } = await client.query<{ categories: CategoryScreen[] }>({
      query: GET_CATEGORIES_SHORT,
      variables: {
        filters: {
          products: {
            documentId: {
              notNull: true,
            },
          },
        },
      },
    });

    if (!data?.categories) {
      return {
        ok: false,
        error: "Пустой ответ от сервера ",
      };
    }
    return {
      ok: true,
      data: data.categories,
    };
  } catch (error) {
    console.error("safeGetFiltersByCategory error", error);
    return {
      ok: false,
      error: "Не удалось загрузить категории. Попробуйте позже.",
    };
  }
};

export const getCategoryBySlug = async (
  slug?: string
): Promise<ApiResult<CategoryDocumentIdType>> => {
  try {
    const { data } = await client.query<CategoryDocumentIdType>({
      query: GET_CATEGORY_BY_SLUG,
      variables: {
        filters: {
          slug: { eq: slug },
        },
      },
    });

    if (!data?.categories) {
      return {
        ok: false,
        error: "Пустой ответ от сервера ",
      };
    }
    return {
      ok: true,
      data,
    };
  } catch (error) {
    console.error("safeGetFiltersByCategory error", error);
    return {
      ok: false,
      error: "Не удалось загрузить категории. Попробуйте позже.",
    };
  }
};
