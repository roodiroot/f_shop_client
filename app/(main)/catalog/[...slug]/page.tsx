import client from "@/lib/apollo-client";

import CatalogList from "@/components/pages/catalog/catalog-list";
import FiltersWrapper from "@/components/pages/catalog/filters-wrapper";

import { getFilters } from "@/data/filters";
import { GET_CATEGORY_BY_SLUG } from "@/graphql/category";
import { CategoryDocumentIdType } from "@/types/category";
import { collectSlugs } from "@/lib/collect-slugs";

const CatalogPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const slugParams = (await params).slug;

  const { data } = await client.query<CategoryDocumentIdType>({
    query: GET_CATEGORY_BY_SLUG,
    variables: {
      filters: {
        slug: { eq: slugParams.at(-1) || "" },
      },
    },
  });

  console.log("RENDER");

  const slugs = collectSlugs(data?.categories[0]);

  const c = data?.categories?.[0];
  const categoryName = c?.name || "";
  const categoryId = c?.documentId || "";
  const filters = await getFilters(categoryId);

  return (
    <FiltersWrapper categoryName={categoryName} dataFilters={filters?.filters}>
      <CatalogList categories={slugs} />
    </FiltersWrapper>
  );
};

export default CatalogPage;
