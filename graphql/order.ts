import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation Mutation($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
    }
  }
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem($data: OrderItemInput!) {
    createOrderItem(data: $data) {
      documentId
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query Query($filters: OrderFiltersInput) {
    orders(filters: $filters) {
      createdAt
      deliveryAddress
      documentId
      totalPrice
      order_items {
        price
        documentId
        quantity
        title
        product {
          slug
          images {
            formats
            url
          }
        }
      }
    }
  }
`;
