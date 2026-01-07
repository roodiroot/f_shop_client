import { getImageUrl } from "@/lib/get-image-url";
import { ProductImage } from "@/types/products";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChildrenCategoryItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  parentSlug: string;
  image: ProductImage;
  name: string;
}

const ChildrenCategoryItem: React.FC<ChildrenCategoryItemProps> = ({
  slug,
  parentSlug,
  image,
  name,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/catalog/${parentSlug}/${slug}`)}
      className="cursor-pointer relative rounded-lg sm:rounded-xl overflow-hidden aspect-[1/1.5] bg-gray-100 p-2 md:p-6 flex flex-col items-center justify-end"
    >
      <span className="absolute z-10 bottom-0 inset-x-0 bg-linear-to-t from-black/60 h-2/3"></span>
      <Image
        width={230}
        height={283}
        priority
        alt={"_image"}
        src={getImageUrl(image, "medium")}
        className="absolute w-full h-full object-cover inset-0 z-0"
      />
      <span className="relative z-20 mt-auto text-white font-bold text-center text-sm sm:text-base tracking-tight">
        {name}
      </span>
    </div>
  );
};

export default ChildrenCategoryItem;
