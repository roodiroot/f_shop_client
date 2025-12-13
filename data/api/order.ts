import client from "@/lib/apollo-client";

import { Order } from "@/types/order";
import { GET_ORDER_BY_ID, GET_ORDER_BY_USER_ID } from "@/graphql/order";

import { ApiResult } from "./types";

export const getOrderByDocumentId = async (
  documentId: string
): Promise<ApiResult<Order>> => {
  try {
    const { data } = await client.query<{ order: Order }>({
      query: GET_ORDER_BY_ID,
      variables: {
        documentId,
      },
      fetchPolicy: "no-cache",
    });

    if (!data?.order) {
      return {
        ok: false,
        error: "Пустой ответ от сервера",
      };
    }
    return {
      ok: true,
      data: data.order,
    };
  } catch (error) {
    console.error("getOrderByDocumentId error", error);
    return {
      ok: false,
      error: "Не удалось загрузить ордер. Попробуйте позже.",
    };
  }
};

export const getOrderByUserId = async (
  userId?: string,
  sort?: string,
  limit = 10
): Promise<ApiResult<Order[]>> => {
  if (!userId) {
    return {
      ok: false,
      error: "Не указан userId",
    };
  }

  try {
    const { data } = await client.query<{ orders: Order[] }>({
      query: GET_ORDER_BY_USER_ID,
      variables: {
        filters: {
          user: {
            documentId: {
              eq: userId,
            },
          },
        },
        sort,
        pagination: {
          limit,
        },
      },
      fetchPolicy: "no-cache",
    });

    if (!data?.orders) {
      return {
        ok: false,
        error: "Пустой ответ от сервера",
      };
    }
    return {
      ok: true,
      data: data.orders,
    };
  } catch (error) {
    console.error("getOrderByDocumentId error", error);
    return {
      ok: false,
      error: "Не удалось загрузить заказы. Попробуйте позже.",
    };
  }
};
