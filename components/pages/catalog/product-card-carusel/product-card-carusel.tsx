import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

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
            <div className="w-full h-full relative bg-red-500 aspect-[1.5/2] lg:aspect-auto lg:h-80">
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
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 opacity-70">
        {count > 1 &&
          new Array(count)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-0.5 w-3 rounded-full bg-gray-200",
                  current === index + 1 && "bg-gray-400"
                )}
              />
            ))}
      </div>
    </Carousel>
  );
};

export default ProductCardCarusel;
