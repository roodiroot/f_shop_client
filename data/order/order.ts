import { useMutation } from "@apollo/client/react";

import { CartItem } from "@/hooks/use-cart";
import { useAuth } from "@/context/authcontext";
import { CREATE_ORDER, CREATE_ORDER_ITEM } from "@/graphql/order";

type CreateOrderArgs = {
  totalPrice: number;
  deliveryAddress: string;
  phone: string;
  email: string;
  cartItems: CartItem[];
  comment?: string;
};

type CreateOrderResult = {
  success: boolean;
  orderId?: string;
  error?: unknown;
};

type OrderData = {
  statusOrder: "pending" | "paid" | "shipped" | "canceled";
  totalPrice: number;
  deliveryAddress: string;
  phone: string;
  email: string;
  comment?: string | null;
  paymentMethod: "card" | "cash" | "online";
  user?: string;
};

export const useCreateOrderApi = () => {
  const authContext = useAuth();
  const { auth } = authContext ?? {};

  const [createOrderMutation, { loading, error }] = useMutation(CREATE_ORDER);
  const [createOrderItemMutation] = useMutation(CREATE_ORDER_ITEM);

  const userId = auth?.user?.documentId;
  const token = auth?.token;

  const createOrderApi = async (
    value: CreateOrderArgs
  ): Promise<CreateOrderResult> => {
    if (!value.cartItems.length) {
      throw new Error("Ваша корзина пуста");
    }

    const orderData: OrderData = {
      statusOrder: "pending",
      totalPrice: value?.totalPrice,
      deliveryAddress: value?.deliveryAddress,
      phone: value?.phone,
      email: value?.email,
      comment: value?.comment,
      paymentMethod: "card",
    };

    try {
      if (userId && token) {
        orderData.user = userId;
      }

      const orderRes = await createOrderMutation({
        variables: {
          data: orderData,
        },
      });

      const orderId = (orderRes?.data as any)?.createOrder?.documentId;

      if (!orderId) {
        throw new Error("Order ID is missing");
      }

      await Promise.all(
        value.cartItems.map((item) =>
          createOrderItemMutation({
            variables: {
              data: {
                order: orderId,
                product: item.documentId,
                title: item.name,
                sku: item.slug,
                price: item.price,
                quantity: item.quantity,
              },
            },
          })
        )
      );
      return { success: true, orderId };
    } catch (err) {
      console.error("Create order error:", err);
      return { success: false, error: err };
    }
  };

  return { createOrderApi, loading, error };
};
