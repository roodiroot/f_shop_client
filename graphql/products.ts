import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products(
    $filters: ProductFiltersInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    products_connection(
      filters: $filters
      sort: $sort
      pagination: $pagination
    ) {
      nodes {
        slug
        documentId
        price
        shortName
        subcategory
        vendor
        categoryParam
        images {
          formats
        }
      }
      pageInfo {
        page
        pageCount
        pageSize
        total
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Product($documentId: ID!) {
    product(documentId: $documentId) {
      slug
      color
      categoryParam
      composition
      count
      denomination
      description
      documentId
      fitBottom
      gender
      manufaktura
      name
      oldPrice
      price
      rise
      season
      seasonality
      shortName
      size
      sku
      subcategory
      topBottom
      vendor
      waist
      images {
        formats
      }
    }
  }
`;
export const GET_PRODUCT_BY_SLUG = gql`
  query Products($filters: ProductFiltersInput) {
    products(filters: $filters) {
      slug
      color
      categoryParam
      composition
      count
      denomination
      description
      documentId
      fitBottom
      gender
      manufaktura
      name
      oldPrice
      price
      rise
      season
      seasonality
      shortName
      size
      sku
      subcategory
      topBottom
      vendor
      waist
      images {
        formats
      }
    }
  }
`;
