import NoProduct from "@/components/pages/card-product/skeletons/no-product";
import Breadcrumbs from "@/components/pages/card-product/breadcrumbs/breadcrumbs";
import ProductCardContainer from "@/components/pages/card-product/product-card-container";

import { buildBreadcrumbs } from "@/lib/build-category-trail";
import { getProductBySlag } from "@/data/api/products";
import ProductFeatures from "@/components/pages/card-product/product-features/product-features";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const { data: product, ok } = await getProductBySlag(slug);

  if (!ok || !product) {
    return <NoProduct />;
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
        product={product}
        variants={variants}
        colors={colors}
        variantsByColor={variantsByColor}
      />
      <ProductFeatures />
    </div>
  );
};

export default ProductPage;
