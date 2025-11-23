"use client";

import ProductCard from "./product-card";
import WrapperCatalogList from "./wrapper-catalog-list";
import Pagination from "./filters/pagination/pagination";

import { Skeleton } from "@/components/ui/skeleton";
import { convertToStrapiFilters } from "@/lib/converter-to-strapi-filter";

import { useUrlFilters } from "@/hooks/use-url-filters";
import { useProduct } from "@/hooks/query/use-product";

interface CatalogListProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: string[];
}

const CatalogList: React.FC<CatalogListProps> = ({ categories }) => {
  const urlFilters = useUrlFilters();
  const { filters, sort, pagination } = convertToStrapiFilters(urlFilters);

  filters.categories = {
    slug: { in: categories },
  };

  const { productsList, pageInfo, loading, error } = useProduct({
    filters,
    sort,
    pagination,
  });

  if (error) {
    return (
      <WrapperCatalogList>
        <div className="">Ошибка загрузки</div>
      </WrapperCatalogList>
    );
  }

  if (loading) {
    return (
      <WrapperCatalogList>
        {new Array(12).fill("").map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />
            <Skeleton className="mt-4 w-full rounded-md h-5" />
          </div>
        ))}
      </WrapperCatalogList>
    );
  }

  return (
    <>
      <WrapperCatalogList>
        {productsList?.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </WrapperCatalogList>
      <Pagination pageInfo={pageInfo} />
    </>
  );
};

export default CatalogList;
