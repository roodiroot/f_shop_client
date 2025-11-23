"use client";

import { toast } from "@/components/ui/sonner";
import { CartItem, useCart } from "@/hooks/use-cart";
import { useCartModalOpen } from "@/hooks/use-cart-modal-open";
import { cn } from "@/lib/utils";

interface AddProductCartButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: Omit<CartItem, "quantity">;
}

const AddProductCartButton: React.FC<AddProductCartButtonProps> = ({
  product,
}) => {
  const { addToCart, items } = useCart();
  const { open } = useCartModalOpen();

  const disabled = items.map((i) => i.documentId).includes(product.documentId);
  const adding = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!product.documentId) return;

    addToCart({ ...product, quantity: 1 });
    toast({
      title: "Товар добавлен в корзину!",
      description: product.name,
    });
  };
  return (
    <button
      onClick={disabled ? open : adding}
      className={cn(
        disabled && "",
        "cursor-pointer mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-white hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:outline-hidden disabled:cursor-default disabled:bg-neutral-400"
      )}
    >
      {!disabled ? "Добавить в корзину" : "Перейти в корзину"}
    </button>
  );
};

export default AddProductCartButton;
