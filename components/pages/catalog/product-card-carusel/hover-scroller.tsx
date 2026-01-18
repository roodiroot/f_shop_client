import { CarouselApi } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HoverScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  api: CarouselApi | undefined;
  count: number;
}

const HoverScroller: React.FC<HoverScrollerProps> = ({ api, count }) => {
  const isDesctop = useMediaQuery("(min-width: 1024px)");

  if (!isDesctop) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex">
      {count > 1 &&
        new Array(count)
          .fill(0)
          .map((_, index) => (
            <button
              key={index}
              onMouseEnter={() => api?.scrollTo(index, true)}
              className="h-full flex-1"
            />
          ))}
    </div>
  );
};
export default HoverScroller;
