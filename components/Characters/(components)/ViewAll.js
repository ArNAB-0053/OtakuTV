import SearchBar from "@/components/Search/SearchBar";
import React from "react";
import SelectOption from "./SelectOption";
import { Button } from "@/components/ui/button";
import { GiCrossMark } from "react-icons/gi";
import SelectLanguage from "./SelectLanguage";
import CharacterVC from "./CharaterVCAll";

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
        <div className="viewallstaff bg-background/25 fixed inset-0 flex items-center justify-center z-40">
          <div className="w-[90%] h-[90vh] lg:h-auto md:w-[60%] lg:w-[90%] xl:w-[70%] p-4 lg:p-7 viewAllbg-glass bg-gradient-to-r from-[#000000e1] to-[#1c1c1ccf] flex flex-col rounded-xl overflow-hidden">
            <div className="flex items-start justify-between w-full mb-4 flex-col xl:flex-row">
              <div className="flex items-start gap-y-2 justify-start flex-col-reverse lg:flex-row gap-x-6 w-full">
                <span className="w-full md:w-[60%] border bg-transparent text-sm">
                  <SearchBar
                    searchwhat="characters"
                    onSearchChange={handleSearchChange}
                    searchTerm={searchTerm}
                    className="flex w-full items-center justify-start px-4 py-2 border-solid border border-white/30 bg-transparent"
                  />
                </span>
                <SelectOption
                  handleSelectChange={handleSelectChange}
                  selectedLanguage={selectedLanguage}
                  uniqueLanguagesArray={uniqueLanguagesArray}
                />
              </div>
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
            <div className="flex-grow overflow-hidden">
              <CharacterVC
                characters={filteredChars}
                selectedLanguage={selectedLanguage}
                itemsPerPage={8}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAll;