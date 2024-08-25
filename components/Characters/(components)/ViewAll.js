import SearchBar from "@/components/Search/SearchBar";
import React from "react";
import SelectOption from "./SelectOption";
import { Button } from "@/components/ui/button";
import { ImCross } from "react-icons/im";
import SelectLanguage from "./SelectLanguage";

const ViewAll = ({
  isViewingAll,
  handleSearchChange,
  searchTerm,
  handleSelectChange,
  selectedLanguage,
  uniqueLanguagesArray,
  handleClose,
  filteredChars,
}) => {
  return (
    <>
      {isViewingAll && (
        <div className="viewallstaff bg-background/25 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden flex items-center justify-center z-40">
          <div className="w-[90%] h-[80%] md:w-[80%] md:h-[80%] lg:w-[60%] lg:h-[60%] bg-bgitem dark:bg-bgitem flex flex-col items-start justify-center lg:p-8 p-4 rounded-md">
            <div className="flex items-start justify-between w-full mb-4 flex-col xl:flex-row relative">
              <h3 className="text-3xl font-bold">Character</h3>
              <div className="flex items-start gap-y-2 justify-between flex-col-reverse lg:flex-row xl:justify-evenly w-full mt-6 xl:mt-0">
                <span className="w-full md:w-[60%] border bg-transparent text-sm">
                  <SearchBar
                    searchwhat="characters"
                    onSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                    className="flex w-full items-center justify-start  px-4 py-2 border-solid border border-white/30 bg-transparent"
                  />
                </span>
                <SelectOption
                  handleSelectChange={handleSelectChange}
                  selectedLanguage={selectedLanguage}
                  uniqueLanguagesArray={uniqueLanguagesArray}
                />
              </div>
              <Button
                className="bg-red-600 text-white hover:text-red-600 hover:bg-slate-200 absolute xl:relative right-0"
                onClick={handleClose}
              >
                <ImCross />
              </Button>
            </div>
            <span className="flex flex-wrap items-start justify-start gap-x-16 gap-y-6 pr-6 w-full h-full overflow-auto overflow-x-hidden scrollbar-thin">
              <SelectLanguage
                characters={filteredChars}
                selectedLanguage={selectedLanguage}
                upto={filteredChars.length}
              />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAll;
