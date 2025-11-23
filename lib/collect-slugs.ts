import { CategoryDocumentIdType, TypeShort } from "@/types/category";

export function collectSlugs(category?: TypeShort): string[] {
  const slugs: string[] = [];

  if (!category) return slugs;

  // добавляем текущий
  if (category.slug) {
    slugs.push(category.slug);
  }

  // обрабатываем вложенных
  const children = category.children || [];

  for (const child of children) {
    slugs.push(...collectSlugs(child));
  }

  return slugs;
}
