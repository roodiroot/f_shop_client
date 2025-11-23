import { ProductImage } from "@/types/products";

export function getImageUrl(image?: ProductImage | null) {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
  if (!image) {
    return "/no-image.jpg";
  }
  const formats = image?.formats;

  const url =
    formats?.small?.url ?? formats?.medium?.url ?? formats?.large?.url ?? null;

  return url ? base + url : "/no-image.jpg";
}
