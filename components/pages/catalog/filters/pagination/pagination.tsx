"use client";

import NextButton from "./next-button";
import HiddenPage from "./hidden-page";
import NumberButton from "./number-button";
import PreviousButton from "./previous-button";

import { PageInfo } from "@/types/products";
import { useFilterParams } from "@/hooks/use-filters-param";
import { getPaginationNumbers } from "@/lib/ get-pagination-number";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  pageInfo?: PageInfo;
}

const Pagination: React.FC<PaginationProps> = ({ pageInfo }) => {
  if (!pageInfo || pageInfo?.pageCount <= 1) {
    return null;
  }

  const { getPage, setPage, nextPage, prevPage } = useFilterParams();

  const currentPage = getPage();
  const totalPages = pageInfo?.pageCount || 1;

  const pages = getPaginationNumbers(currentPage, totalPages);

  return (
    <div className="max-w-7xl py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center justify-between border-t px-4 sm:px-0">
        <PreviousButton
          disabled={currentPage <= 1}
          onClick={() => {
            prevPage();
            console.log("PREVIOUS");
          }}
        />
        {pages.map((p, index) => {
          if (p === "...") {
            return <HiddenPage key={p + "_" + index} />;
          }
          return (
            <NumberButton
              key={p + "_" + index}
              active={p === currentPage}
              onClick={() => setPage(p)}
            >
              {p}
            </NumberButton>
          );
        })}
        <NextButton
          disabled={currentPage >= totalPages}
          onClick={() => nextPage(totalPages)}
        />
      </nav>
    </div>
  );
};

export default Pagination;
