"use client";

import { OrderItem } from "@/types/order";
import { getImageUrl } from "@/lib/get-image-url";

import ItemProductOrder from "./item-product-order";

interface ListComponentOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  orderItems: OrderItem[];
}

const ListComponentOrder: React.FC<ListComponentOrderProps> = ({
  orderItems,
}) => {
  return (
    <ul>
      {orderItems.map((item) => (
        <ItemProductOrder
          key={item.documentId}
          slug={item.product?.slug || ""}
          imageUrl={getImageUrl(item.product?.images?.[0])}
          name={item?.title}
          price={Number(item?.price)}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );
};

export default ListComponentOrder;
