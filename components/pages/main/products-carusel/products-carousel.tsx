import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CarouselButtons from "./carousel-buttons";
import { Product } from "@/types/products";
import ProductItem from "@/components/pages/main/present-products-block/product-item";

interface ProductsSaleCarouselProps {
  data?: Product[];
}

const ProductsSaleCarousel: React.FC<ProductsSaleCarouselProps> = ({
  data,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-[110%] ml-4 lg:w-full lg:ml-0"
    >
      <CarouselContent>
        {data
          ? data.map((product, index) => {
              const { colors, prices } = product.product_variants.reduce(
                (acc, { colorHex, price }) => {
                  if (colorHex) acc.colors.add(colorHex);
                  acc.prices.push(price ?? 0);
                  return acc;
                },
                {
                  colors: new Set<string>(),
                  prices: [] as number[],
                }
              );

              return (
                <CarouselItem
                  key={product.slug + index}
                  className="basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2"
                >
                  <div className="p-1 h-full">
                    <ProductItem
                      slug={product.slug}
                      name={product.shortName}
                      cat={product.categoryParam}
                      prices={prices}
                      image={product.product_variants[0].images?.[0]}
                      colorHexVariants={[...colors]}
                    />
                  </div>
                </CarouselItem>
              );
            })
          : null}
      </CarouselContent>
      {data?.length && data?.length > 5 ? <CarouselButtons /> : null}
    </Carousel>
  );
};

export default ProductsSaleCarousel;
