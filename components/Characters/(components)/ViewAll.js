import { useState, useEffect } from "react";
import SearchBar from "@/components/Search/SearchBar";
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isViewingAll) {
      setTimeout(() => setIsVisible(true), 100); // Delay to ensure CSS transition kicks in
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the duration of your transition
      return () => clearTimeout(timer);
    }
  }, [isViewingAll]);

  const handleCloseChar = () => {
    setIsVisible(false);
    setTimeout(handleClose, 300); // Match the duration of your transition
  };

  if (!isViewingAll && !isVisible) return null;

  return (
    <div
      className={`first-div viewallstaff ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`second-div ${
          isVisible ? "translate-y-0" : "-translate-y-20"
        }`}
      >
        <div className="third-div">
          <div className="flex items-start gap-y-2 justify-start flex-col-reverse lg:flex-row gap-x-6 w-full">
            <span className="w-full md:w-[60%] bg-transparent text-sm">
              <SearchBar
                searchwhat="characters"
                onSearchChange={handleSearchChange}
                searchTerm={searchTerm}
                className="flex w-full items-center justify-start px-4 py-2 border-solid border border-white/30 bg-transparent rounded-full lg:mb-4"
              />
            </span>
            <SelectOption
              handleSelectChange={handleSelectChange}
              selectedLanguage={selectedLanguage}
              uniqueLanguagesArray={uniqueLanguagesArray}
            />
          </div>
          <Button
            className="absolute top-2 right-0 z-[9997] bg-transparent hover:bg-transparent"
            onClick={handleCloseChar}
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
  );
};

export default ViewAll;
