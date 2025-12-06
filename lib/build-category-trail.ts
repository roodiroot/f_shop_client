import { ShortCategoryType } from "@/types/category";
import { Product } from "@/types/products";

function buildCategoryTrail(category: ShortCategoryType): ShortCategoryType[] {
  const trail: ShortCategoryType[] = [];
  let current: ShortCategoryType | null | undefined = category;

  while (current) {
    trail.push(current);
    current = current.parent ?? null;
  }

  return trail.reverse();
}

export function buildBreadcrumbs(product: Product) {
  const mainCategory = product.categories[0];

  if (!mainCategory) {
    return [
      { label: "Каталог", href: "/catalog" },
      { label: product.shortName, href: `/product/${product.slug}` },
    ];
  }

  const trail = buildCategoryTrail(mainCategory);

  let accumulatedSlugs: string[] = [];

  const categoryCrumbs = trail.map((cat) => {
    accumulatedSlugs.push(cat.slug);
    return {
      label: cat.name,
      href: `/catalog/${accumulatedSlugs.join("/")}`,
    };
  });

  return [
    { label: "Каталог", href: "/catalog" },
    ...categoryCrumbs,
    { label: product.shortName, href: `/product/${product.slug}` },
  ];
}
