import { mdiArrowLeftCircleOutline, mdiArrowRightCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";

type PaginationProps = {
  pagination:{
    count: number,
    currentPage: number
  }
}

export const Pagination = ({pagination}: PaginationProps) => {
  const per = Math.ceil(55 / 10);
  let fromPagination: number;
  if(pagination.currentPage <= 2 || per < 5){
    fromPagination = 1;
  }else if(per >= 5 && pagination.currentPage >= per - 2){
    fromPagination = per - 4;
  }else{
    fromPagination = pagination.currentPage - 2;
  };
  const maxPage = () => {
    let roop: number = fromPagination + 4;
    if(per < 5){
      roop = per;
    }
    return roop;
  }
  const page = () => {
    const elements = []; 
    for(let i = fromPagination; i <= maxPage(); i++){
      elements.push(
        <div key={i} className="mx-1">
          <Link className={`px-1 ${i == pagination.currentPage ? "text-gray-400" : "text-black"} hover:bg-slate-400 hover:text-slate-100`} href={`/news?page=${i}`}>{i}</Link>
        </div>
      );
    }
    return elements;
  };

  return (
    <div className="w-fit mx-auto flex justify-between">
      <div className="w-6">
        {pagination.currentPage !== 1 &&
          <Link href={`/news?page=${pagination.currentPage - 1}`}>
            <Icon path={mdiArrowLeftCircleOutline} size={1} />
          </Link>
        }
      </div>
      <div className="flex">{page()}</div>
      <div className="w-6">
        {pagination.currentPage !== per &&
          <Link href={`/news?page=${pagination.currentPage + 1}`}>
            <Icon path={mdiArrowRightCircleOutline} size={1} />
          </Link>
        }
      </div>
    </div>
  );
};


