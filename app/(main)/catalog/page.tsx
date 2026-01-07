import TitlePage from "@/components/general/title-page";
import ParentCategoryItem from "@/components/pages/category/parent-category-item";
import Container from "@/components/ui/container";
import { getRootCategories } from "@/data/api/categories";

const CatalogPage = async () => {
  const { data, ok } = await getRootCategories();

  if (!ok) {
    return (
      <Container>
        <div className="">Loading Error</div>;
      </Container>
    );
  }

  return (
    <Container className="pt-0 sm:pt-0 lg:pt-0 mx-auto lg:max-w-4xl">
      <TitlePage>Категории</TitlePage>
      <div className="space-y-10">
        {data?.map((i) => (
          <ParentCategoryItem
            key={i.documentId}
            slug={i.slug}
            image={i.image}
            childrens={i.children}
          />
        ))}
      </div>
    </Container>
  );
};

export default CatalogPage;
