import CategoryPreviews from "@/components/pages/category/category-previews";
import HeroBLock from "@/components/pages/main/hero/hero-block";
import PresentProductsBlock from "@/components/pages/main/present-products-block/present-products-block";
import {
  getChildrenCategories,
  getRootCategories,
} from "@/data/api/categories";
import { getProducts } from "@/data/api/products";
import Link from "next/link";

const HomePaage = async () => {
  const PAGE_SIZE_HITS = 10;

  const { data: sabCategories, ok: okSabCategories } =
    await getChildrenCategories();
  const { data: parentCategories, ok: okParentCategories } =
    await getRootCategories();

  const prodFilterArg = {
    filters: {
      or: [{ sale: { gt: "1" } }, { hit: { eq: true } }],
    },
    sort: ["updatedAt:desc"],
    pagination: { page: 1, pageSize: PAGE_SIZE_HITS },
  };
  const { data: saleHitProd, ok: saleHitOk } = await getProducts(prodFilterArg);

  const newProdFilterArg = {
    sort: ["createdAt:desc"],
    pagination: { page: 1, pageSize: PAGE_SIZE_HITS },
  };
  const { data: newProd, ok: newOk } = await getProducts(newProdFilterArg);

  return (
    <>
      <HeroBLock variant="line" />
      <PresentProductsBlock title="Рекомендуем вам" data={saleHitProd} />
      <CategoryPreviews data={parentCategories} />
      <PresentProductsBlock title="Новинки" data={newProd} />
    </>
  );
};

export default HomePaage;
