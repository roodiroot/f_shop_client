export interface ProductImageFormats {
  thumbnail?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  large?: { url: string };
}

export interface ProductImage {
  formats: ProductImageFormats;
}

export interface ProductAttributes {
  documentId: string;
  slug: string;
  price?: number;
  shortName?: string;
  subcategory?: string;
  vendor?: string;
  categoryParam?: string;
  images: ProductImage[];
}

export interface PageInfo {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ProductConnection {
  nodes: ProductAttributes[];
  pageInfo: PageInfo;
}

export interface ProductsQueryResponse {
  products_connection: ProductConnection;
}

export interface Product {
  slug: string;
  documentId: string;

  sku?: string;
  name?: string;
  shortName?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  vendor?: string;
  manufaktura?: string;
  color?: string;
  categoryParam?: string;
  composition?: string;
  count?: number | null;
  denomination?: string;
  fitBottom?: string;
  topBottom?: string;
  rise?: string;
  waist?: string;
  size?: string;
  gender?: string;
  season?: string;
  seasonality?: string;
  subcategory?: string;
  images?: ProductImage[];
}

export interface ProductResponce {
  product: Product;
}

export type ShortProductType = {
  slug: string;
  documentId: string;
  price: number;
  shortName: string;
  name: string;
  images: ProductImage[];
};
