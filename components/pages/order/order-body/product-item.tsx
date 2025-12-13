import { getFormatPrice } from "@/lib/get-format-price";
import CircleColor from "../../cart/circle-color";
import Image from "next/image";
import { getImageUrl } from "@/lib/get-image-url";
import { ProductImage } from "@/types/products";

interface ProductItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  quantity: number;
  slug: string;
  imageUrl: ProductImage;
  price: number;
  color: string;
  size: string;
}
const ProductItem: React.FC<ProductItemProps> = ({
  title,
  quantity,
  slug,
  imageUrl,
  price,
  color,
  size,
}) => {
  return (
    <div className="sm:flex">
      <div className="relative aspect-square w-full shrink-0 rounded-md object-cover sm:size-40 overflow-hidden">
        <Image
          width={160}
          height={160}
          alt={title + "_image"}
          src={getImageUrl(imageUrl)}
          className="size-full object-cover"
        />
      </div>
      <div className="mt-6 sm:mt-0 sm:ml-6 flex flex-col w-full">
        <div className="">
          <h3 className="font-medium text-gray-900">
            <a target="_blank" href={`/product/${slug}`}>
              {title}
            </a>
          </h3>
          <p className="mt-2 text-sm font-medium text-gray-900">
            {getFormatPrice(price)}
          </p>

          <p className="mt-3 text-sm text-gray-500 line-clamp-2"></p>
        </div>
        <div className="flex-1 flex items-end justify-between gap-6">
          <div className="flex  gap-4">
            <CircleColor color={color} />
            <p className="mt-1 text-xs text-gray-500">Размер: {size}</p>
          </div>
          <div className="text-sm text-gray-900 font-medium">
            Кол-во в заказе:{" "}
            <span className="text-gray-500 font-normal">{quantity} шт.</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
