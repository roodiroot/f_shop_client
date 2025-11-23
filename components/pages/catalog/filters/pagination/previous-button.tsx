import { cn } from "@/lib/utils";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

interface PreviousButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled: boolean;
}
const PreviousButton: React.FC<PreviousButtonProps> = ({
  disabled,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        disabled ? "cursor-default" : "cursor-pointer",
        "mt-[-1px] flex  w-0 flex-1"
      )}
    >
      <div
        className={cn(
          disabled
            ? "text-gray-300"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 transition",
          "inline-flex items-center pt-4 pl-1 text-sm font-medium  border-t-2 border-transparent"
        )}
      >
        <ArrowLongLeftIcon className="mr-3 size-5" />
        Предъидущая
      </div>
    </div>
  );
};

export default PreviousButton;
