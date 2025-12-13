import { useAuth } from "@/context/authcontext";
import {
  checkout,
  CheckoutPayload,
  CheckoutRes,
  payApi,
} from "../api/checkout";

type CreateOrderResult<T> = {
  success: boolean;
  data?: T;
  error?: unknown;
};

export const useCreateOrderApi = () => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};

  const token = auth?.token;

  const createOrderApi = async (
    value: CheckoutPayload
  ): Promise<CreateOrderResult<CheckoutRes>> => {
    try {
      const res = await checkout(value, token);

      if (!res.ok) {
        return {
          success: false,
          error: res.error,
        };
      }

      return { success: true, data: res.data };
    } catch (err) {
      console.error("Create order error:", err);
      return {
        success: false,
        error: (err as Error)?.message || "Ошибка создания заказа.",
      };
    }
  };

  const pay = async (orderId: string) => {
    try {
      const res = await payApi(orderId);

      if (!res.ok) {
        return {
          success: false,
          error: res.error,
        };
      }

      return { success: true, data: res.data };
    } catch (err) {
      console.error("Create order error:", err);
      return {
        success: false,
        error: (err as Error)?.message || "Ошибка создания заказа.",
      };
    }
  };

  return { createOrderApi, pay };
};
