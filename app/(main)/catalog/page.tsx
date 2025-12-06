import CatalogList from "@/components/pages/catalog/catalog-list";
import FiltersWrapper from "@/components/pages/catalog/filters-wrapper";
import { getFilters } from "@/data/filters";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/category";
import client from "@/lib/apollo-client";
import { collectSlugs } from "@/lib/collect-slugs";
import { CategoryDocumentIdType } from "@/types/category";
import { connection } from "next/server";
import { Suspense } from "react";

const CatalogPage = async () => {
  await connection();
  const { data } = await client.query<CategoryDocumentIdType>({
    query: GET_CATEGORY_BY_SLUG,
  });

  console.log("RENDER");

  const slugs = collectSlugs(data?.categories[0]);

  const c = data?.categories?.[0];
  const categoryName = c?.name || "";
  const categoryId = c?.documentId || "";
  const filters = await getFilters(categoryId);

  return (
    <FiltersWrapper categoryName={categoryName} dataFilters={filters?.filters}>
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogList categories={slugs} />
      </Suspense>
    </FiltersWrapper>
  );
};

export default CatalogPage;
