import React, { useState, useEffect } from "react";
import Fetchstaff from "./Fetchstaff";
import { Button } from "../../ui/button";
import SearchBar from "../../Search/SearchBar";
import PaginationComponent from "./PaginationComponent";
import { GiCrossMark } from "react-icons/gi";

const ViewAll = ({ isViewingAll, searchTerm, handleCloseStaff, handleSearchChange, filteredStaff, getPos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage] = useState(9);
  const [isVisible, setIsVisible] = useState(false);

  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (isViewingAll) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isViewingAll]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(handleCloseStaff, 300); 
  };

  if (!isViewingAll && !isVisible) return null;

  return (
    <div className={`first-div viewallstaff ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`second-div ${isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
        <div className="third-div">
          <span className="w-[99%] md:w-[50%] border bg-transparent text-sm">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              searchwhat="staff"
              className="flex w-full items-center justify-start px-4 py-2 border-solid border border-white/30 bg-transparent rounded-full"
            />
          </span>
          <Button
            className="absolute top-2 right-2 z-[9997] bg-transparent hover:bg-transparent"
            onClick={handleClose}
          >
            <GiCrossMark
              size={28}
              color="red"
              className="hover:brightness-75 brightness-100 animation"
            />
          </Button>
        </div>
        <span className="flex flex-wrap items-start justify-start gap-x-16 gap-y-6 w-full h-[calc(100%-100px)] overflow-auto overflow-x-hidden scrollbar-thin">
          {currentStaff?.length > 0 ? (
            currentStaff.map((staffff) => (
              <Fetchstaff
                key={staffff.person?.url}
                url={staffff.person?.url}
                image_url={staffff?.person?.images?.jpg.image_url}
                positions={getPos(staffff.positions)}
                name={staffff.person?.name.replace(/,/g, "")}
              />
            ))
          ) : (
            <h1 className="text-center w-full text-muted">No result found</h1>
          )}
        </span>
        <div className="mt-4 w-full">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAll;