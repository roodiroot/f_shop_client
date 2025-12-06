import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 lg:pt-40",
        className
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Container;
