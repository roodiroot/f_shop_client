import { Skeleton } from "@/components/ui/skeleton";

import WrapperCatalogList from "../wrapper-catalog-list";

const CatalogSkeleton = () => {
  return (
    <WrapperCatalogList>
      {new Array(12).fill("").map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />
          <Skeleton className="mt-4 w-full rounded-md h-5" />
        </div>
      ))}
    </WrapperCatalogList>
  );
};

export default CatalogSkeleton;
