import { cn } from "@/lib/utils";

interface StockInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  stock?: number;
}

const StockInfo: React.FC<StockInfoProps> = ({ stock = 0, className }) => {
  if (!stock || stock < 0) {
    return (
      <div className={cn(className, "text-sm text-red-500 font-medium")}>
        Товар закончился
      </div>
    );
  }
  return (
    <div className={cn(className, "text-sm text-gray-900 font-medium")}>
      {stock < 3 && stock > 0 ? "Осталось мало" : null}
    </div>
  );
};
export default StockInfo;
