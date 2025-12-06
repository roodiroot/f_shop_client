"use client";

import { useEffect, useMemo, useState } from "react";

import AddProductCartButton from "@/components/pages/card-product/add-button";

import { cn } from "@/lib/utils";
import { ProductVariant } from "@/types/products";
import { StarIcon } from "@heroicons/react/20/solid";
import { getFormatPrice } from "@/lib/get-format-price";

const reviews = { href: "#", average: 4, totalCount: 117 };

type Props = {
  variants: ProductVariant[];
  colors: string[];
  variantsByColor: Record<string, ProductVariant[]>;
  onVariantChange?: (variant: ProductVariant | null) => void;
};

export function VariantPicker({
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

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>
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
              {colors.map((color) => (
                <div
                  key={color}
                  className="flex rounded-full outline -outline-offset-1 outline-black/10"
                >
                  <input
                    defaultValue={color}
                    defaultChecked={color === selectedColor}
                    onClick={() => {
                      setSelectedColor(color);

                      const firstSize =
                        variantsByColor[color]?.[0]?.size ?? null;
                      setSelectedSize(firstSize);
                    }}
                    name="color"
                    type="radio"
                    aria-label={color}
                    style={{ background: color }}
                    className="size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3"
                  />
                </div>
              ))}
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
              {sizes.map((size) => (
                <label
                  key={size}
                  aria-label={size}
                  className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-brand has-checked:bg-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                >
                  <input
                    defaultValue={size}
                    defaultChecked={size === selectedSize}
                    onClick={() => setSelectedSize(size || null)}
                    name="size"
                    type="radio"
                    className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                  />
                  <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                    {size}
                  </span>
                </label>
              ))}
            </div>
            <div className="text-sm text-gray-900 font-medium mt-4 absolute -bottom-6 left-0">
              {!currentVariant?.stock || currentVariant?.stock < 3
                ? "Осталось мало"
                : null}
            </div>
          </fieldset>
        </div>

        <AddProductCartButton
        //   product={{
        //     documentId: data.products[0].documentId || "",
        //     slug: data.products[0].slug || "",
        //     name:
        //       data.products[0].categoryParam + " " + data.products[0].shortName,
        //     imageUrl: getImageUrl(data?.products[0]?.images?.[0]),
        //   }}
        />
      </div>
    </div>
  );

  //   return (
  //     <div className="space-y-4">
  //       {/* Цвета */}
  //       <div>
  //         <div className="mb-2 text-sm text-muted-foreground">Цвет</div>
  //         <div className="flex gap-2 flex-wrap">
  //           {colors.map((color) => (
  //             <button
  //               key={color}
  //               onClick={() => {
  //                 setSelectedColor(color);

  //                 const firstSize = variantsByColor[color]?.[0]?.size ?? null;
  //                 setSelectedSize(firstSize);
  //               }}
  //               className={`px-3 py-1 border rounded ${
  //                 color === selectedColor ? "border-black" : "border-gray-300"
  //               }`}
  //             >
  //               {color}
  //             </button>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Размеры */}
  //       <div>
  //         <div className="mb-2 text-sm text-muted-foreground">Размер</div>
  //         <div className="flex gap-2 flex-wrap">
  //           {sizes.map((size) => (
  //             <button
  //               key={size}
  //               onClick={() => setSelectedSize(size)}
  //               className={`px-3 py-1 border rounded ${
  //                 size === selectedSize ? "border-black" : "border-gray-300"
  //               }`}
  //             >
  //               {size}
  //             </button>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Цена / наличие */}
  //       <div>
  //         {currentVariant ? (
  //           <>
  //             <div className="text-lg font-semibold">
  //               {currentVariant.price} ₽
  //             </div>
  //             <div className="text-sm text-muted-foreground">
  //               {currentVariant.stock > 0
  //                 ? `В наличии: ${currentVariant.stock} шт.`
  //                 : "Нет в наличии"}
  //             </div>
  //           </>
  //         ) : (
  //           <div className="text-sm text-muted-foreground">
  //             Выберите цвет и размер
  //           </div>
  //         )}
  //       </div>

  //       {/* Кнопка */}
  //       <button
  //         disabled={!currentVariant || currentVariant.stock <= 0}
  //         className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
  //       >
  //         В корзину
  //       </button>
  //     </div>
  //   );
}
