"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useCreateOrderApi } from "@/data/order/order";

interface RepayButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  orderId: string;
  status: "waiting_for_payment" | "paid" | "shipped" | "canceled";
}

const RepayButton: React.FC<RepayButtonProps> = ({ orderId, status }) => {
  if (status === "paid") {
    return null;
  }

  const { pay } = useCreateOrderApi();
  const handleSubmit = async () => {
    try {
      const res = await pay(orderId);

      if (res.success) {
        if (res.data?.confirmationUrl) {
          window.open(res.data.confirmationUrl, "_blank");
        }
      }

      if (res.error) {
        toast({
          title: `Ошибка оформления заказа!`,
          description: (res.error as { message?: string })?.message,
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast({
        title: "Ошибка создания заказа!",
        description: message,
      });
    }
  };

  return <Button onClick={handleSubmit}>Оплатить</Button>;
};

export default RepayButton;
