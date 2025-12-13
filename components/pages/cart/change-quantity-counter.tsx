"use client";

import ChooseQuantity from "@/components/ui/choose-quantity";

interface ChangeQuantityCounterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variantId: string;
  quantity: number;
  stock: number;
  updateItemQuantity?: (documentId: string, quantity: number) => void;
}

const ChangeQuantityCounter: React.FC<ChangeQuantityCounterProps> = ({
  variantId,
  quantity,
  stock,
  updateItemQuantity,
  ...props
}) => {
  const handleChangeQuantity = (next: number) => {
    updateItemQuantity && updateItemQuantity(variantId, next);
  };

  return (
    <ChooseQuantity
      max={stock}
      count={quantity}
      className={props.className}
      onChangeQuantity={handleChangeQuantity}
    />
  );
};

export default ChangeQuantityCounter;
