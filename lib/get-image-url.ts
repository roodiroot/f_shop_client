import { ProductImage } from "@/types/products";

export function getImageUrl(
  image?: ProductImage | null,
  variant?: "small" | "medium" | "large" | "thumbnail"
) {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";
  if (!image) {
    return "/no-image.jpg";
  }
  const formats = image?.formats;

  let url;

  if (variant === "large") {
    url =
      formats?.large?.url ??
      formats?.medium?.url ??
      formats?.small?.url ??
      null;
  }
  if (variant === "medium") {
    url =
      formats?.medium?.url ??
      formats?.small?.url ??
      formats?.large?.url ??
      null;
  }
  if (variant === "thumbnail") {
    url =
      formats?.thumbnail?.url ??
      formats?.small?.url ??
      formats?.medium?.url ??
      formats?.large?.url ??
      null;
  }
  if (!variant || variant === "small") {
    url =
      formats?.small?.url ??
      formats?.medium?.url ??
      formats?.large?.url ??
      null;
  }

  return url ? base + url : "/no-image.jpg";
}
