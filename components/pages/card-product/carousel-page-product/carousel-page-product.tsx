import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImagesList } from "../image-gallery";
import { getImageUrl } from "@/lib/get-image-url";

interface CarouselPageProductProps extends React.HTMLAttributes<HTMLDivElement> {
  imagesArray?: ImagesList[] | undefined;
}

const CarouselPageProduct: React.FC<CarouselPageProductProps> = ({
  imagesArray,
}) => {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg bg-red-500 overflow-hidden"
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
  );
};

export default CarouselPageProduct;
