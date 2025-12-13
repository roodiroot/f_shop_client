import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface ChooseQuantityProps extends React.HTMLAttributes<HTMLFormElement> {
  count?: number;
  min?: number;
  max?: number;
  onChangeQuantity?: (value: number) => void;
}
const ChooseQuantity: React.FC<ChooseQuantityProps> = ({
  count = 1,
  min = 1,
  max = 10,
  onChangeQuantity,
  className,
}) => {
  const [value, setValue] = useState(count || 0);

  useEffect(() => {
    setValue(count);
  }, [count]);

  const updateValue = (next: number) => {
    let v = next;

    if (v < min) v = min;
    if (typeof max === "number" && v > max) v = max;

    setValue(v);
    onChangeQuantity?.(v);
  };

  const handleDecrement = () => {
    updateValue(value - 1);
  };

  const handleIncrement = () => {
    updateValue(value + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const parsed = raw === "" ? min : Number(raw);
    updateValue(parsed);
  };

  return (
    <form className={cn("max-w-21", className)}>
      <div className="relative flex items-center max-w-36 shadow-xs rounded-lg">
        <button
          onClick={handleDecrement}
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="text-sm box-border border font-medium rounded-s-sm px-1.5 h-6 hover:bg-gray-50 cursor-pointer"
        >
          <MinusIcon className="size-3" />
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="border-x-0 h-6 text-sm placeholder:text-sm text-center w-full py-2.5"
          placeholder="1"
          required
          onChange={handleInputChange}
          value={value}
        />
        <button
          type="button"
          onClick={handleIncrement}
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="text-body box-border border font-medium rounded-e-sm text-sm px-1.5 h-6 hover:bg-gray-50 cursor-pointer"
        >
          <PlusIcon className="size-3" />
        </button>
      </div>
    </form>
  );
};

export default ChooseQuantity;
