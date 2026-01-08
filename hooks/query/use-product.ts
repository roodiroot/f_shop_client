"use client";

import { GET_PRODUCTS } from "@/graphql/products";
import { ProductsQueryResponse } from "@/types/products";
import {
  PaginationParams,
  ProductFilters,
  SortParams,
} from "@/types/sort-filter-pagination";
import { useQuery } from "@apollo/client/react";

interface UseProductParams {
  filters?: ProductFilters;
  skip?: boolean;
  sort?: SortParams;
  pagination?: PaginationParams;
}

export const useProduct = ({
  filters = {},
  skip = false,
  sort = ["createdAt:desc"],
  pagination = { page: 1, pageSize: 12 },
}: UseProductParams) => {
  const { data, loading, error } = useQuery<ProductsQueryResponse>(
    GET_PRODUCTS,
    {
      skip,
      variables: {
        filters,
        sort,
        pagination,
      },
    }
  );

  return {
    productsList: data?.products_connection.nodes ?? [],
    pageInfo: data?.products_connection.pageInfo,
    loading,
    error,
  };
};
