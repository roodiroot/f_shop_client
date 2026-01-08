"use client";

import { Skeleton } from "@/components/ui/skeleton";

import WrapperCatalogList from "../catalog/wrapper-catalog-list";
import ProductCard from "../catalog/product-card";
import Pagination from "../catalog/filters/pagination/pagination";
import { PageInfo, Product, ProductAttributes } from "@/types/products";
import WrapperSearchList from "./wrapper-search-list";

interface SearchListProps extends React.HTMLAttributes<HTMLDivElement> {
  productsList: ProductAttributes[];
  loading: boolean;
  error: any;
  pageInfo?: PageInfo;
}

const SearchList: React.FC<SearchListProps> = ({
  productsList,
  pageInfo,
  loading,
  error,
}) => {
  if (error) {
    return (
      <WrapperSearchList>
        <div className="">Ошибка загрузки</div>
      </WrapperSearchList>
    );
  }

  if (loading) {
    return (
      <WrapperSearchList>
        {new Array(12).fill("").map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />
            <Skeleton className="mt-4 w-full rounded-md h-5" />
          </div>
        ))}
      </WrapperSearchList>
    );
  }

  return (
    <>
      <WrapperSearchList>
        {productsList?.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </WrapperSearchList>
      <Pagination pageInfo={pageInfo} />
    </>
  );
};

export default SearchList;
