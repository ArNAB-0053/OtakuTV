import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { GrNext, GrPrevious } from "react-icons/gr";

const PaginationHome = ({ handlePageChange, page, totalPages }) => {
  return (
    <Pagination className="my-4 relative">
      <PaginationContent className="absolute right-0">
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${page===1 && "text-white/50 hover:text-white/50 "}`}
            onClick={() => handlePageChange(Math.max(1, Number(page) - 1))}
            disabled={page === 1} 
            Previous={<GrPrevious size={20} />}
            noIcon={true}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${page===totalPages && "text-white/50 hover:text-white/50 "}`}
            onClick={() => handlePageChange(Math.min(totalPages, Number(page) + 1))}
            disabled={page === totalPages} 
            Next={<GrNext size={20} />}
            noIcon={true}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationHome;
