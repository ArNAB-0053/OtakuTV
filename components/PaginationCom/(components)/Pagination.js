import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const PaginationForAll = ({handlePageChange, page, totalPages}) => {
  return (
    <Pagination className="my-10 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer select-none"
              onClick={() => handlePageChange(Math.max(1, Number(page) - 1))}
              disabled={page === 1}
            />
          </PaginationItem>
          {[...Array(Math.min(5, totalPages))].map((_, index) => {
            const pageNumber = Number(page) - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              const isActive = pageNumber === Number(page);
              return (
                <PaginationItem
                  className="cursor-pointer select-none"
                  key={pageNumber}
                >
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${isActive ? "bg-bgitem" : ""}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer select-none"
              onClick={() =>
                handlePageChange(Math.min(totalPages, Number(page) + 1))
              }
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}

export default PaginationForAll