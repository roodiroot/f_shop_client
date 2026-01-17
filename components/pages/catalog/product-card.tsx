"use client";

import Link from "next/link";
import Image from "next/image";

import { getImageUrl } from "@/lib/get-image-url";
import { getFormatPrice } from "@/lib/get-format-price";

import { ProductAttributes } from "@/types/products";
import ProductCardCarusel from "./product-card-carusel/product-card-carusel";
import { useRouter } from "next/navigation";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductAttributes;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const minPrice = Math.min(
    ...product?.product_variants.map((v) => v?.price || 0)
  );
  const imgs = product.product_variants[0].images?.map((i) =>
    getImageUrl(i, "large")
  );

  return (
    <div className="group relative">
      <div
        onClick={() => router.push(`/product/${product.slug}`)}
        className="relative z-20 flex flex-end items-end p-4 aspect-[1.5/2] w-full rounded-md bg-gray-200 object-cover overflow-hidden group-hover:opacity-75 lg:aspect-auto lg:h-80"
      >
        <ProductCardCarusel imagesArrey={imgs} />
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
