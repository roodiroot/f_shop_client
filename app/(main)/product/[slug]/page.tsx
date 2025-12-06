import client from "@/lib/apollo-client";

import Container from "@/components/ui/container";
import Breadcrumbs from "@/components/pages/card-product/breadcrumbs/breadcrumbs";
import ProductCardContainer from "@/components/pages/card-product/product-card-container";

import { GET_PRODUCT_BY_SLUG } from "@/graphql/products";

import { Product } from "@/types/products";
import { buildBreadcrumbs } from "@/lib/build-category-trail";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const paramsResolved = (await params).slug;

  const { data } = await client.query<{ products: Product[] }>({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      filters: {
        slug: {
          eq: paramsResolved,
        },
      },
    },
    fetchPolicy: "no-cache",
  });

  const product = data?.products[0] || null;

  if (!product) {
    return (
      <Container className="bg-white">
        <div className="text-center">Товар не найден</div>
      </Container>
    );
  }

  const crumbs = buildBreadcrumbs(product);

  const variants = product?.product_variants || [];
  const colors = Array.from(new Set(variants.map((v) => v?.colorHex || "")));
  const variantsByColor =
    colors.reduce((acc: Record<string, typeof variants>, color) => {
      acc[color || ""] = variants.filter((v) => v?.colorHex === color);
      return acc;
    }, {}) || [];

  return (
    <div className="pt-6 bg-white">
      <Breadcrumbs crumbs={crumbs} />
      <ProductCardContainer
        shortName={product.shortName}
        description={product?.description}
        categoryParam={product?.categoryParam}
        variants={variants}
        colors={colors}
        variantsByColor={variantsByColor}
      />
    </div>
  );
};

export default ProductPage;
