import { Product } from "@/types/products";
import { ApiResult } from "./types";
import client from "@/lib/apollo-client";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/products";

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
