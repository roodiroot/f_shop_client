import { cn } from "@/lib/utils";

interface PaginationCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number;
  count: number;
}

const PaginationCarousel: React.FC<PaginationCarouselProps> = ({
  current,
  count,
}) => {
  return (
    <div className="absolute bottom-1 inset-x-2 flex items-center gap-0.5 opacity-70">
      {count > 1 &&
        new Array(count)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-0.5 flex-1 rounded-full bg-gray-200",
                current === index + 1 && "bg-gray-400"
              )}
            />
          ))}
    </div>
  );
};

export default PaginationCarousel;
