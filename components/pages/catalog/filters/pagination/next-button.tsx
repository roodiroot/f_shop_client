import { cn } from "@/lib/utils";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

interface NextButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled: boolean;
}
const NextButton: React.FC<NextButtonProps> = ({ disabled, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        disabled ? "cursor-default" : "cursor-pointer",
        "mt-[-1px] flex justify-end w-0 flex-1"
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
        Сдудующая
        <ArrowLongRightIcon className="ml-3 size-5" />
      </div>
    </div>
  );
};

export default NextButton;
