"use client";

import Link from "next/link";
import Image from "next/image";

import { getFormatPrice } from "@/lib/get-format-price";
import { useProductQuickview } from "@/hooks/use-product-quickview";
import { getImageUrl } from "@/lib/get-image-url";

import { ProductAttributes } from "@/types/products";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductAttributes;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { open } = useProductQuickview();
  return (
    <div className="group relative">
      <div className="relative flex flex-end items-end p-4 aspect-square w-full rounded-md bg-gray-200 object-cover overflow-hidden group-hover:opacity-75 lg:aspect-auto lg:h-80 ">
        <Image
          width={150}
          height={300}
          priority
          alt={product.shortName + "_image"}
          src={getImageUrl(product?.images?.[0])}
          className="w-full h-full object-cover absolute inset-0 z-0"
        />
        <button
          onClick={() => open(product)}
          className="rounded-md relative z-10 w-full bg-white/75 px-4 py-2 text-sm text-gray-900 opacity-0 group-hover:opacity-100"
        >
          Просмотр
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 line-clamp-1">
            <Link href={`/product/${product.slug}`}>
              <span aria-hidden="true" />
              {product?.categoryParam} {product?.shortName}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {getFormatPrice(product?.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
