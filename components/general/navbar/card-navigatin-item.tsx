import { getImageUrl } from "@/lib/get-image-url";
import { ShortProductType } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

interface CardNavigationItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  product: ShortProductType;
  setOpenPopover?: (value: string | null) => void;
}

const CardNavigationItem: React.FC<CardNavigationItemProps> = ({
  product,
  setOpenPopover,
}) => {
  return (
    <div
      key={product.documentId}
      className="group relative text-base sm:text-sm"
    >
      <Image
        width={200}
        height={200}
        alt={product.shortName + "_image"}
        src={getImageUrl(product?.images[0])}
        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
      />
      <Link
        href={`/product/${product.slug}`}
        onClick={() => (setOpenPopover ? setOpenPopover(null) : null)}
        className="mt-6 block font-medium text-gray-900"
      >
        <span aria-hidden="true" className="absolute inset-0 z-10" />
        {product.shortName || product.name}
      </Link>
      <p aria-hidden="true" className="mt-1">
        Shop now
      </p>
    </div>
  );
};

export default CardNavigationItem;
