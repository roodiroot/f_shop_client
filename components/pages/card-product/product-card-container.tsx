"use client";

import { useMemo, useState } from "react";

import HeadProduct from "./head-product";
import ImageGallery from "./image-gallery";
import DescriptionContent from "./description-contant";

import { VariantPicker } from "./variant-picker";

import { ProductVariant } from "@/types/products";

interface ProductCardContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  shortName: string;
  categoryParam?: string;
  variants: ProductVariant[];
  colors: string[];
  variantsByColor: Record<string, ProductVariant[]>;
  description?: string;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  shortName,
  categoryParam,
  variants,
  colors,
  variantsByColor,
  description,
}) => {
  const defaultVariant: ProductVariant | null = useMemo(() => {
    const firstColor = colors[0];
    if (!firstColor) return null;
    const firstVariants = variantsByColor[firstColor];
    if (!firstVariants || firstVariants.length === 0) return null;
    return firstVariants[0];
  }, [colors, variantsByColor]);

  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    defaultVariant
  );

  const galleryImages =
    currentVariant?.images?.map((img) => ({
      image: img,
      alt: currentVariant?.colorHex + "_" + currentVariant?.size || "",
    })) ?? [];

  return (
    <>
      <ImageGallery images={galleryImages} />
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <HeadProduct title={categoryParam + " " + shortName} />

        <VariantPicker
          variants={variants}
          colors={colors}
          variantsByColor={variantsByColor}
          onVariantChange={setCurrentVariant}
        />

        <DescriptionContent description={description} />
      </div>
    </>
  );
};

export default ProductCardContainer;
