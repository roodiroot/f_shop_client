import { cn } from "@/lib/utils";
import NameOrder from "../name-order";

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "waiting_for_payment" | "paid" | "shipped" | "canceled";
  date: string;
}
const StatusBar: React.FC<StatusBarProps> = ({ status, date }) => {
  const dateCreate = new Date(date);
  const formatted = dateCreate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const statusProcent = {
    waiting_for_payment: 12,
    paid: 40,
    shipped: 65,
    canceled: 100,
  };

  const statWidth = statusProcent[status];

  return (
    <>
      <p className="text-sm font-medium text-gray-900">
        Изменение <time dateTime="2021-03-24">{formatted}</time>
      </p>
      <div className="mt-6">
        <div className=" overflow-hidden rounded-2xl bg-gray-200">
          <div
            style={{ width: `${statWidth}%` }}
            className={cn(
              "h-2 rounded-2xl bg-green-500",
              status === "canceled" && "bg-red-500"
            )}
          ></div>
        </div>
        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-400 sm:grid">
          <div
            className={cn(
              "text-center",
              status === "waiting_for_payment" && "text-green-500"
            )}
          >
            Ожидает оплаты
          </div>
          <div
            className={cn("text-center", status === "paid" && "text-green-500")}
          >
            Оплачен
          </div>
          <div
            className={cn(
              "text-center",
              status === "shipped" && "text-green-500"
            )}
          >
            Отправлен
          </div>
          <div
            className={cn(
              "text-center",
              status === "canceled" && "text-red-500"
            )}
          >
            Отменен
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusBar;
