import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

type PaginationProps = {
  maxPageNumber: number;
  currentPageNumber: number;
};

export const Pagination = ({ maxPageNumber, currentPageNumber }: PaginationProps) => {
  const prevPage = currentPageNumber - 1;
  const nextPage = currentPageNumber + 1;

  return (
    <div className="flex px-3 my-12">
      {currentPageNumber !== 1 && (
        <Link href={`/blogs/page/${prevPage}`}>
          <div className="flex">
            <Icon path={mdiChevronLeft} size={1} />
            <div>Prev</div>
          </div>
        </Link>
      )}
      {currentPageNumber !== maxPageNumber && (
        <Link href={`/blogs/page/${nextPage}`}>
          <div className="ml-4 flex">
            <div>Next</div>
            <Icon path={mdiChevronRight} size={1} />
          </div>
        </Link>
      )}
    </div>
  );
};
