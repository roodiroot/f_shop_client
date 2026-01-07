import { Product } from "@/types/products";
import { ApiResult } from "./types";
import client from "@/lib/apollo-client";
import { GET_PRODUCT_BY_SLUG, GET_PRODUCTS } from "@/graphql/products";

export const getProductBySlag = async (
  slug: string
): Promise<ApiResult<Product>> => {
  try {
    const { data } = await client.query<{ products: Product[] }>({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        filters: {
          slug: {
            eq: slug,
          },
        },
      },
      fetchPolicy: "no-cache",
    });
    if (!data?.products?.[0]) {
      return {
        ok: false,
        error: "Пустой ответ от сервера",
      };
    }
    return {
      ok: true,
      data: data.products[0],
    };
  } catch (error) {
    console.error("safeGetFiltersByCategory error", error);
    return {
      ok: false,
      error: "Не удалось загрузить продукт. Попробуйте позже.",
    };
  }
};

export const getProducts = async ({
  filters = {},
  skip = false,
  sort = ["createdAt:desc"],
  pagination = { page: 1, pageSize: 12 },
}): Promise<ApiResult<Product[]>> => {
  try {
    const { data } = await client.query<{
      products_connection: { nodes: Product[] };
    }>({
      query: GET_PRODUCTS,
      variables: {
        filters,
        sort,
        pagination,
        skip,
      },
      fetchPolicy: "no-cache",
    });

    if (!data?.products_connection?.nodes) {
      return {
        ok: false,
        error: "Пустой ответ от сервера",
      };
    }
    return {
      ok: true,
      data: data.products_connection.nodes,
    };
  } catch (error) {
    console.error("safeGetFiltersByCategory error", error);
    return {
      ok: false,
      error: "Не удалось загрузить продукт. Попробуйте позже.",
    };
  }
};
