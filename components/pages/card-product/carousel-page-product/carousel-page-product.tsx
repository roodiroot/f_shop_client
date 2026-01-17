import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImagesList } from "../image-gallery";
import { getImageUrl } from "@/lib/get-image-url";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CarouselPageProductProps extends React.HTMLAttributes<HTMLDivElement> {
  imagesArray?: ImagesList[] | undefined;
}

const CarouselPageProduct: React.FC<CarouselPageProductProps> = ({
  imagesArray,
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
    <>
      <div className="mx-auto mt-6 max-w-2xl sm:px-6">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg overflow-hidden"
        >
          <CarouselContent>
            {imagesArray?.map((el, index) => (
              <CarouselItem key={el?.image + "_" + index} className="pl-0">
                <div className="">
                  <Image
                    width={640}
                    height={800}
                    priority
                    alt={el?.alt || ""}
                    src={getImageUrl(el.image, "large")}
                    className="aspect-4/5 w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 flex gap-0.5 mt-2 opacity-65">
        {count > 1 &&
          new Array(count)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1 w-5 rounded-full bg-gray-200",
                  current === index + 1 && "bg-gray-400"
                )}
              ></button>
            ))}
      </div>
    </>
  );
};

export default CarouselPageProduct;
