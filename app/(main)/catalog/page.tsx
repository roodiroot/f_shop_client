import { Suspense } from "react";
import { connection } from "next/server";

import CatalogList from "@/components/pages/catalog/catalog-list";
import FiltersWrapper from "@/components/pages/catalog/filters-wrapper";
import CatalogSkeleton from "@/components/pages/catalog/skeleton/catalog-skeleton";

import { collectSlugs } from "@/lib/collect-slugs";
import { getCategoryBySlug } from "@/data/api/categories";
import { getFiltersByCategory } from "@/data/api/filters";
import CategoryPreviews from "@/components/pages/category/category-previews";

const CatalogPage = async () => {
  await connection();
  const { data, ok } = await getCategoryBySlug();

  const slugs = collectSlugs(data?.categories[0]);

  const c = data?.categories?.[0];
  const categoryName = c?.name || "";
  const categoryId = c?.documentId || "";

  const { data: dataFilters, ok: okFilters } = await getFiltersByCategory(
    categoryId
  );

  if (!ok || !okFilters) {
    return (
      <FiltersWrapper>
        <CatalogSkeleton />
      </FiltersWrapper>
    );
  }

  return (
    // <FiltersWrapper categoryName={categoryName} dataFilters={dataFilters}>
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <CatalogList categories={slugs} />
    //   </Suspense>
    // </FiltersWrapper>
    <CategoryPreviews />
  );
};

export default CatalogPage;
