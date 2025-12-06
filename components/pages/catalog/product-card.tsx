"use client";

import Link from "next/link";
import Image from "next/image";

import { getImageUrl } from "@/lib/get-image-url";
import { getFormatPrice } from "@/lib/get-format-price";

import { ProductAttributes } from "@/types/products";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductAttributes;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const minPrice = Math.min(
    ...product?.product_variants.map((v) => v?.price || 0)
  );
  const img = product.product_variants[0].images?.[0];
  return (
    <div className="group relative">
      <div className="relative flex flex-end items-end p-4 aspect-square w-full rounded-md bg-gray-200 object-cover overflow-hidden group-hover:opacity-75 lg:aspect-auto lg:h-80 ">
        <Image
          width={150}
          height={300}
          priority
          alt={product.shortName + "_image"}
          src={getImageUrl(img)}
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
      </div>
      <div className="mt-4">
        <div>
          <h3 className="text-sm text-gray-700 line-clamp-1">
            <Link href={`/product/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0 z-10" />
              {product?.categoryParam} {product?.shortName}
            </Link>
          </h3>
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">
          <span className="whitespace-nowrap">
            от {getFormatPrice(minPrice)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
