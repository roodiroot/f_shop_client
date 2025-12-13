"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useConfirm } from "@/hooks/use-confirm";
import { useCartModalOpen } from "@/hooks/use-cart-modal-open";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SumComponent from "./sum-component";
import CartItemProduct from "./cart-item-product";

const CartComponent = () => {
  const { isOpen, close } = useCartModalOpen();
  const { items, removeFromCart, updateItemQuantity } = useCart();
  const { ask } = useConfirm();

  const removeItemCart = (documentId: string) => {
    ask("Уверены что хотите удалить товар из корзины?", () => {
      removeFromCart(documentId);
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
        <div className="relative flex h-full flex-col overflow-y-auto bg-white">
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col sm:px-6">
            <div className="flex items-start justify-between">
              <SheetHeader className="p-0">
                <SheetTitle className="text-lg font-medium text-gray-900">
                  Корзина
                </SheetTitle>
                <div className="absolute top-0 right-0 py-2 sm:py-0">
                  <SheetClose className="relative text-gray-400 hover:text-gray-500 p-4 sm:p-6">
                    <XMarkIcon className="size-6" />
                  </SheetClose>
                </div>
              </SheetHeader>
            </div>
            <div className="mt-8 flex flex-1">
              {items.length > 0 ? (
                <div className="flow-root  w-full">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <CartItemProduct
                        key={product.variantId}
                        documentId={product.variantId}
                        slug={product.slug}
                        stock={product.stock}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        size={product.size}
                        price={product.price}
                        color={product.color}
                        quantity={product.quantity}
                        updateItemQuantity={updateItemQuantity}
                        removeFromCart={removeItemCart}
                        close={close}
                      />
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="self-center w-full">
                  <div className="mx-auto">
                    <ShoppingBagIcon className="size-10 mx-auto text-neutral-300 " />
                    <div className="text-center text-neutral-600 mt-6">
                      Ваша корзина пока пуста
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <SumComponent close={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartComponent;
