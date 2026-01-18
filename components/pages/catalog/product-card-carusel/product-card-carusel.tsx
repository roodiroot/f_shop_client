import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import PaginationCarousel from "./pagination-carousel";
import HoverScroller from "./hover-scroller";

interface ProductCardCaruselProps extends React.HTMLAttributes<HTMLDivElement> {
  imagesArrey?: string[];
}
const ProductCardCarusel: React.FC<ProductCardCaruselProps> = ({
  imagesArrey,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="absolute inset-0"
    >
      <CarouselContent>
        {imagesArrey?.map((url) => (
          <CarouselItem key={url} className="pl-0">
            <div className="w-full h-full relative aspect-[1.5/2] lg:aspect-auto lg:h-80">
              <Image
                width={614}
                height={820}
                priority
                alt={"product_image"}
                src={url}
                className="w-full h-full object-cover absolute inset-0 z-0"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <HoverScroller api={api} count={count} />
      <PaginationCarousel current={current} count={count} />
    </Carousel>
  );
};

export default ProductCardCarusel;
