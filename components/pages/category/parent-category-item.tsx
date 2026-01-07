"use client";

import Image from "next/image";

import { getImageUrl } from "@/lib/get-image-url";
import { ProductImage } from "@/types/products";
import { ChildrenCategory } from "@/types/category";
import ChildrenCategoryItem from "./children-category-item";
import { useRouter } from "next/navigation";

interface ParentCategoryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  image: ProductImage;
  childrens: ChildrenCategory[];
}

const ParentCategoryItem: React.FC<ParentCategoryItemProps> = ({
  image,
  slug,
  childrens,
}) => {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.push(`/catalog/${slug}`)}
        className="relative aspect-[2.6/1] w-full bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
      >
        <Image
          width={1172}
          height={451}
          priority
          alt={"_image"}
          src={getImageUrl(image, "large")}
          className="absolute w-full h-full object-cover inset-0 z-0"
        />
      </div>
      <div className="mt-6 grid grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5">
        {childrens.map((c) => (
          <ChildrenCategoryItem
            key={c.documentId}
            slug={c.slug}
            parentSlug={slug}
            name={c.name}
            image={c.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentCategoryItem;
