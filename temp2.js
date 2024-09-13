import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { FiChevronsLeft,  FiChevronsRight } from 'react-icons/fi';
import { GrNext, GrPrevious } from 'react-icons/gr';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${(currentPage===1 || currentPage===2) && "text-white/50 hover:text-white/50 hidden"}`}
          >
            <FiChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            Previous={<GrPrevious size={15} />}
            noIcon={true}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${currentPage===1 && "text-white/50 hover:text-white/50 hidden"}`}
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number} className=" cursor-pointer select-none">
            {Math.abs(currentPage - number) < 2 ? (
              <PaginationLink 
                onClick={() => onPageChange(number)}
                className={currentPage === number ? "bg-red-500 hover:bg-red-600 text-white" : ""}
              >
                {number}
              </PaginationLink>
            ) : number === 2 || number === totalPages - 1 }
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            Next={<GrNext size={15} />}
            noIcon={true}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${currentPage===totalPages && "text-white/50 hover:text-white/50 hidden "}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${(currentPage===totalPages || currentPage===totalPages-1) && "text-white/50 hover:text-white/50  hidden"}`}
          >
            < FiChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;