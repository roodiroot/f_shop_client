import ProductsSaleCarousel from "@/components/pages/main/products-carusel/products-carousel";
import { Product } from "@/types/products";
import Link from "next/link";

interface PresentProductsBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data?: Product[];
}
const PresentProductsBlock: React.FC<PresentProductsBlockProps> = ({
  title,
  data,
}) => {
  return (
    <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32 overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          href="/catalog"
          className=" hidden text-sm font-bold text-gray-700 tracking-tight sm:block"
        >
          В каталог
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
      <div className="mt-8">
        <ProductsSaleCarousel data={data} />
      </div>
    </div>
  );
};

export default PresentProductsBlock;
