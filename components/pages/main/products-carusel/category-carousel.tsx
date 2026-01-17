import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CarouselButtons from "./carousel-buttons";
import { Product } from "@/types/products";
import ProductItem from "@/components/pages/main/present-products-block/product-item";
import { CategoryScreen } from "@/types/category";
import ChildrenCategoryItem from "../../category/children-category-item";

interface CategoriesSaleCarouselProps {
  data?: CategoryScreen[];
}

const CategoriesSaleCarousel: React.FC<CategoriesSaleCarouselProps> = ({
  data,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {data
          ? data.map((category, index) => {
              return (
                <CarouselItem
                  key={category.slug + index}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2"
                >
                  <div className="p-1 h-full">
                    <ChildrenCategoryItem
                      slug={category.slug}
                      parentSlug={category.slug}
                      name={category.name}
                      image={category.image}
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

export default CategoriesSaleCarousel;
