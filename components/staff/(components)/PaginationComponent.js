import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { GrNext, GrPrevious } from 'react-icons/gr';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const visiblePages = [];

    // Pages close to the current page (2 before and 2 after)
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const visiblePages = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex justify-center items-center">
        {/* Navigate to the first page */}
        <PaginationItem>
          <PaginationLink 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${(currentPage === 1) && "text-white/50 hover:text-white/50 hidden"}`}
          >
            <FiChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            Previous={<GrPrevious size={8} />}
            noIcon={true}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${currentPage === 1 && "text-white/50 hover:text-white/50 hidden"}`}
          />
        </PaginationItem>

        {/* Display only the relevant page numbers */}
        {visiblePages.map((number) => (
          <PaginationItem key={number} className="cursor-pointer select-none">
            <PaginationLink 
              onClick={() => onPageChange(number)}
              className={`text-center ${currentPage === number ? "bg-red-500 hover:bg-red-600 text-white" : "hover:text-red-600"}`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            Next={<GrNext size={8} />}
            noIcon={true}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${currentPage === totalPages && "text-white/50 hover:text-white/50 hidden "}`}
          />
        </PaginationItem>

        {/* Navigate to the last page */}
        <PaginationItem>
          <PaginationLink 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`cursor-pointer select-none hover:text-red-600 hover:bg-transparent flex items-center justify-center ${(currentPage === totalPages) && "text-white/50 hover:text-white/50 hidden"}`}
          >
            <FiChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;