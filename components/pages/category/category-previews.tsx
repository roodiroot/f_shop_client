import { getImageUrl } from "@/lib/get-image-url";
import { CategoryRootType, CategoryScreen } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import CategoriesSaleCarousel from "../main/products-carusel/category-carousel";

interface CategoryPreviewsProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: CategoryRootType[];
  dataSubCategories?: CategoryScreen[];
}

const CategoryPreviews: React.FC<CategoryPreviewsProps> = ({
  data,
  dataSubCategories,
}) => {
  if (!data || !dataSubCategories) return null;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Коллекции
            </h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
              {data.map((callout) => (
                <div key={callout.name} className="group relative">
                  <Image
                    width={672}
                    height={336}
                    priority
                    alt={callout.name + "_image"}
                    src={getImageUrl(callout.image, "large")}
                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 sm:aspect-2.5/1"
                  />
                  <h3 className="mt-6 text-sm text-gray-500">
                    <Link href={`/catalog/${callout.slug}`}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <CategoriesSaleCarousel data={dataSubCategories} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPreviews;
