import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductCardCaruselProps extends React.HTMLAttributes<HTMLDivElement> {
  imagesArrey?: string[];
}
const ProductCardCarusel: React.FC<ProductCardCaruselProps> = ({
  imagesArrey,
}) => {
  return (
    <Carousel
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
    </Carousel>
  );
};

export default ProductCardCarusel;
