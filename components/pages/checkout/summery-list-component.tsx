"use client";

import { useCart } from "@/hooks/use-cart";

import { useConfirm } from "@/hooks/use-confirm";

import SummeryItemProduct from "./summery-item-product";

const SummeryListComponent = () => {
  const { items, removeFromCart } = useCart();
  const { ask } = useConfirm();

  const removeItemCart = (documentId: string, stock?: number) => {
    if (!stock || stock <= 0) {
      return removeFromCart(documentId);
    }
    ask("Уверены что хотите удалить товар?", () => {
      removeFromCart(documentId);
    });
  };

  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {items.map((product) => (
        <SummeryItemProduct
          key={product.variantId}
          documentId={product.variantId}
          slug={product.slug}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          color={product.color}
          size={product.size}
          quantity={product.quantity}
          stock={product.stock}
          removeFromCart={removeItemCart}
        />
      ))}
    </ul>
  );
};

export default SummeryListComponent;
