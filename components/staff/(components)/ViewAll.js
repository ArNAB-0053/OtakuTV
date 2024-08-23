import React from "react";
import Fetchstaff from "./Fetchstaff";
import { ImCross } from "react-icons/im";
import { Button } from "../../ui/button";
import SearchBar from "../../Search/SearchBar";

const ViewAll = ({ isViewingAll, searchTerm, handleCloseStaff, handleSearchChange, filteredStaff, getPos }) => {
  return (
    <>
      {isViewingAll && (
        <div className="viewallstaff bg-background/25 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden flex items-center justify-center z-40">
          <div className="w-[90%] h-[80%] md:w-[80%] md:h-[80%] lg:w-[60%] lg:h-[60%] bg-bgitem flex flex-col items-start justify-center lg:p-8 p-4 rounded-md">
            <div className="flex items-start justify-between flex-col md:flex-row w-full mb-6 gap-y-3 relative">
              <h3 className="text-3xl font-bold">Staff</h3>
              <span className="w-[99%] md:w-[50%] border bg-transparent text-sm">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  searchwhat="staff"
                />
              </span>
              <Button
                className="bg-red-600 text-white hover:text-red-600 hover:bg-slate-200 absolute right-0 md:relative"
                onClick={handleCloseStaff}
              >
                <ImCross />
              </Button>
            </div>
            <span className="flex flex-wrap items-start justify-start gap-x-16 gap-y-6 w-full h-full overflow-auto">
              {filteredStaff?.length > 0 ? (
                filteredStaff.map((staffff) => {
                  return (
                    <Fetchstaff
                      key={staffff.person?.url}
                      url={staffff.person?.url}
                      image_url={staffff?.person?.images?.jpg.image_url}
                      positions={getPos(staffff.positions)}
                      name={staffff.person?.name.replace(/,/g, "")}
                    />
                  );
                })
              ) : (
                <h1 className="text-center w-full text-muted">
                  No result found
                </h1>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAll;
