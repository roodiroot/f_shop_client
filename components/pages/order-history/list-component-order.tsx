"use client";

import { OrderItem } from "@/types/order";
import { getImageUrl } from "@/lib/get-image-url";

import ItemProductOrder from "./item-product-order";

interface ListComponentOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  orderItems: OrderItem[];
  status: "waiting_for_payment" | "paid" | "shipped" | "canceled";
  updatedStatus: string;
}

const ListComponentOrder: React.FC<ListComponentOrderProps> = ({
  orderItems,
  status,
  updatedStatus,
}) => {
  return (
    <ul>
      {orderItems.map((item) => (
        <ItemProductOrder
          key={item.documentId}
          slug={item.product?.slug || ""}
          imageUrl={getImageUrl(item.product_variant?.images?.[0])}
          name={item?.title}
          price={Number(item?.product_variant.price)}
          quantity={item.quantity}
          status={status}
          updatedStatus={updatedStatus}
        />
      ))}
    </ul>
  );
};

export default ListComponentOrder;
