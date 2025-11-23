import { cn } from "@/lib/utils";

interface NumberButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  active,
  children,
  ...props
}) => {
  return (
    <div {...props} className="cursor-pointer mt-[-1px] hidden sm:flex">
      <div
        className={cn(
          active
            ? " border-gray-800 text-gray-700"
            : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent transition",
          "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default NumberButton;
