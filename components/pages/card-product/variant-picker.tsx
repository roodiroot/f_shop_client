"use client";

import { useEffect, useMemo, useState } from "react";

import AddProductCartButton from "@/components/pages/card-product/add-button";

import { cn } from "@/lib/utils";
import { ProductImage, ProductVariant } from "@/types/products";
import { StarIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { getFormatPrice } from "@/lib/get-format-price";
import { getImageUrl } from "@/lib/get-image-url";
import StockInfo from "./stok-info";

const reviews = { href: "#", average: 4, totalCount: 117 };

type Props = {
  documentIdProduct: string;
  slugProduct: string;
  variants: ProductVariant[];
  colors: string[];
  image?: ProductImage;
  shortName: string;
  variantsByColor: Record<string, ProductVariant[]>;
  onVariantChange?: (variant: ProductVariant | null) => void;
};

export function VariantPicker({
  documentIdProduct,
  slugProduct,
  image,
  shortName,
  variants,
  colors,
  variantsByColor,
  onVariantChange,
}: Props) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[0] ?? null
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    const firstColor = colors[0];
    if (!firstColor) return null;

    const firstVariants = variantsByColor[firstColor];
    if (!firstVariants || firstVariants.length === 0) return null;

    return firstVariants[0].size || null;
  });

  const sizes = useMemo(() => {
    if (!selectedColor) return [];
    const list = variantsByColor[selectedColor] ?? [];
    return Array.from(new Set(list.map((v) => v.size)));
  }, [selectedColor, variantsByColor]);

  const currentVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    return (
      variants.find(
        (v) => v.colorHex === selectedColor && v.size === selectedSize
      ) ?? null
    );
  }, [variants, selectedColor, selectedSize]);

  useEffect(() => {
    onVariantChange?.(currentVariant ?? null);
  }, [currentVariant, onVariantChange]);

  const stock = currentVariant?.stock || 0;

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Информация о товаре</h2>
      <p className="text-3xl tracking-tight text-gray-900">
        {getFormatPrice(currentVariant?.price)}
      </p>

      {/* Reviews */}
      <div className="mt-6">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={cn(
                  reviews.average > rating ? "text-gray-900" : "text-gray-200",
                  "size-5 shrink-0"
                )}
              />
            ))}
          </div>
          <p className="sr-only">{reviews.average} out of 5 stars</p>
          <a
            href={reviews.href}
            className="ml-3 text-sm font-medium text-brand hover:text-brand/80"
          >
            {reviews.totalCount} reviews
          </a>
        </div>
      </div>

      <div className="mt-10">
        {/* Colors */}
        <div>
          <h3 className="text-sm font-medium text-gray-900">Цвета</h3>

          <fieldset aria-label="Choose a color" className="mt-4">
            <div className="flex items-center gap-x-3">
              {colors.map((color) => {
                const variantsForColor = variantsByColor[color] ?? [];

                const colorHasStock = variantsForColor.some(
                  (v) => (v.stock || 0) > 0
                );
                return (
                  <div
                    key={color}
                    className={cn(
                      "relative flex rounded-full outline -outline-offset-1 outline-black/10",
                      !colorHasStock && "cursor-not-allowed"
                    )}
                  >
                    {!colorHasStock && (
                      <XMarkIcon className="size-10 opacity-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                    <input
                      defaultValue={color}
                      defaultChecked={color === selectedColor}
                      onClick={() => {
                        if (!colorHasStock) return;

                        setSelectedColor(color);

                        const variantsForThisColor =
                          variantsByColor[color] ?? [];
                        const firstWithStock =
                          variantsForThisColor.find(
                            (v) => (v.stock || 0) > 0
                          ) ?? variantsForThisColor[0];

                        const firstSize = firstWithStock?.size ?? null;
                        setSelectedSize(firstSize);
                      }}
                      name="color"
                      type="radio"
                      aria-label={color}
                      style={{ background: color }}
                      disabled={!colorHasStock}
                      className="size-8 opacity-40 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3"
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Sizes */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Размер</h3>
            <a
              href="#"
              className="text-sm font-medium text-brand hover:text-brand/80"
            >
              Гайд по размерам
            </a>
          </div>

          <fieldset aria-label="Choose a size" className="relative mt-4">
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((size) => {
                const variantForSize = (
                  variantsByColor[selectedColor || ""] ?? []
                ).find((v) => v.size === size);

                const sizeStock = variantForSize?.stock ?? 0;
                const isDisabled = sizeStock <= 0;
                return (
                  <label
                    key={size}
                    aria-label={size}
                    className={cn(
                      "group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-brand has-checked:bg-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25",
                      isDisabled && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <input
                      defaultValue={size}
                      defaultChecked={size === selectedSize}
                      onClick={() => {
                        if (isDisabled) return;
                        setSelectedSize(size || null);
                      }}
                      name="size"
                      type="radio"
                      disabled={isDisabled}
                      className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium text-gray-900 uppercase group-has-checked:text-white",
                        isDisabled && "group-has-checked:text-gray-900"
                      )}
                    >
                      {size}
                    </span>
                  </label>
                );
              })}
            </div>
            <StockInfo
              stock={stock}
              className="mt-4 absolute -bottom-6 left-0"
            />
          </fieldset>
        </div>

        <AddProductCartButton
          product={{
            documentId: documentIdProduct,
            slug: slugProduct,
            name: shortName,
            imageUrl: getImageUrl(image),
            price: currentVariant?.price || 0,
            size: currentVariant?.size || "S",
            color: currentVariant?.colorHex || "#FFF",
            variantId: currentVariant?.documentId || "",
            stock: stock,
          }}
        />
      </div>
    </div>
  );
}
