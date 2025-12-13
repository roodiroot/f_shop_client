"use client";

import { toast } from "@/components/ui/sonner";

interface NameOrderProps extends React.HTMLAttributes<HTMLDivElement> {
  order: string;
}
const NameOrder: React.FC<NameOrderProps> = ({ order }) => {
  const handleOrder = () => {
    navigator.clipboard.writeText(order);
    toast({
      title: "Номер скопирован в буфер.",
    });
  };
  return (
    <h1
      onClick={handleOrder}
      className="cursor-pointer text-3xl sm:text-4xl font-bold tracking-tight text-gray-900"
    >
      Order #{" "}
      <span className="block text-base font-light line-clamp-1 sm:text-lg">
        {" "}
        {order}
      </span>
    </h1>
  );
};

export default NameOrder;
