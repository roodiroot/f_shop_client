import CatalogList from "@/components/pages/catalog/catalog-list";
import FiltersWrapper from "@/components/pages/catalog/filters-wrapper";
import { GET_PRODUCTS } from "@/graphql/products";
import client from "@/lib/apollo-client";
import { ProductsQueryResponse } from "@/types/products";

const CatalogPage = async () => {
  const { data } = await client.query<ProductsQueryResponse>({
    query: GET_PRODUCTS,
    variables: {
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    },
  });

  return (
    <div className="">
      <FiltersWrapper>
        <CatalogList products={data?.products} />
      </FiltersWrapper>
    </div>
  );
};

export default CatalogPage;
