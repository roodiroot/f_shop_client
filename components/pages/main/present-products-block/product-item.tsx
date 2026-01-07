"use client";

import { getFormatPrice } from "@/lib/get-format-price";
import { getImageUrl } from "@/lib/get-image-url";
import { ProductImage } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  name: string;
  cat?: string;
  image?: ProductImage;
  prices?: number[];
  colorHexVariants?: string[];
}
const ProductItem: React.FC<ProductItemProps> = ({
  slug,
  name,
  cat,
  prices = [0],
  image,
  colorHexVariants,
}) => {
  const minPrice = Math.min(...prices);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full  ">
        <Image
          width={1172}
          height={451}
          priority
          alt={"_image"}
          src={getImageUrl(image, "large")}
          className="aspect-[1/1.3] w-full rounded-md object-cover h-auto"
        />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 tracking-tight">{name}</p>
          <h3 className="mt-1 font-bold text-gray-900 tracking-tight">
            <Link href={`/product/${slug}`}>
              <span className="absolute inset-0"></span>
              {cat}
            </Link>
          </h3>
          <div className="mt-1 text-gray-900">
            от {getFormatPrice(minPrice)}
          </div>
        </div>
      </div>
      <ul className="mt-auto flex items-center justify-center flex-wrap gap-3 pt-6">
        {colorHexVariants?.map((colorHex, index) => (
          <li
            key={colorHex + "_" + index}
            className="relative size-4 rounded-full border overflow-hidden"
          >
            <div
              style={{ backgroundColor: colorHex }}
              className="absolute inset-0 opacity-60"
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductItem;
