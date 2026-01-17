import Image from "next/image";

import { getImageUrl } from "@/lib/get-image-url";

import { ProductImage } from "@/types/products";
import { useMediaQuery } from "@/hooks/use-media-query";
import { is } from "zod/v4/locales";
import CarouselPageProduct from "./carousel-page-product/carousel-page-product";

export interface ImagesList {
  image?: ProductImage;
  alt: string;
}

interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: ImagesList[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const isDesctop = useMediaQuery("(min-width: 1024px)");

  if (isDesctop) {
    return (
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
        <Image
          width={340}
          height={480}
          priority
          alt={images?.[0]?.alt || ""}
          src={getImageUrl(images?.[0]?.image, "large")}
          className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
        />
        <Image
          width={340}
          height={480}
          priority
          alt={images?.[1]?.alt || ""}
          src={getImageUrl(images?.[1]?.image, "large")}
          className="col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
        />
        <Image
          width={340}
          height={480}
          priority
          alt={images?.[2]?.alt || ""}
          src={getImageUrl(images?.[2]?.image, "large")}
          className="col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden"
        />
        <Image
          width={340}
          height={480}
          priority
          alt={images?.[3]?.alt || ""}
          src={getImageUrl(images?.[3]?.image, "large")}
          className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
        />
      </div>
    );
  }
  return <CarouselPageProduct imagesArray={images} />;
};

export default ImageGallery;
