"use client";

import { useCart } from "@/hooks/use-cart";

import { useConfirm } from "@/hooks/use-confirm";

import SummeryItemProduct from "./summery-item-product";

const SummeryListComponent = () => {
  const { items, removeFromCart } = useCart();
  const { ask } = useConfirm();

  const removeItemCart = (documentId: string) => {
    ask("Уверены что хотите удалить товар?", () => {
      removeFromCart(documentId);
    });
  };

  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {items.map((product) => (
        <SummeryItemProduct
          key={product.documentId}
          documentId={product.documentId}
          slug={product.slug}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          color={product.color}
          quantity={product.quantity}
          removeFromCart={removeItemCart}
        />
      ))}
    </ul>
  );
};

export default SummeryListComponent;
