"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import SelectLanguage from "./(components)/SelectLanguage";
import { Button } from "../ui/button";
import { ImCross } from "react-icons/im";
import SearchBar from "../Search/SearchBar";
import SelectOption from "./(components)/SelectOption";
import useSWR from "swr";
import SkeletonLoader from "./(components)/loading";
import Error from "./(components)/error";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const Characters = ({ animeID }) => {
  const [uniqueLanguages, setUniqueLanguages] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error } = useSWR(`https://api.jikan.moe/v4/anime/${animeID}/characters`, fetcher)

  useEffect(() => {
    if (data) {
      const languages = new Set(
        data.flatMap((character) =>
          character.voice_actors?.map((vc) => vc.language)
        )
      );
      setUniqueLanguages([...languages]);
    }
  }, [data]);

  const uniqueLanguagesArray = [...uniqueLanguages];

  const handleSelectChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleOpen = () => {
    setIsViewingAll(true);
  };

  const handleClose = () => {
    setIsViewingAll(false);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredChars = data?.filter((char) => {
    const searchLower = searchTerm.toLowerCase();
    const name = char.character?.name?.toLowerCase() || "";
    const role = char.role?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchLower) || role.includes(searchLower);

    const selectedVoiceActor =
      selectedLanguage !== "all"
        ? char.voice_actors.find(
            (va) => va.language.toLowerCase() === selectedLanguage.toLowerCase()
          )
        : char.voice_actors[0];

    const matchesLanguage = selectedLanguage === "all" || selectedVoiceActor;

    return matchesSearch && matchesLanguage;
  });


  if(error) return <SkeletonLoader limit={3} />
  if(!data) return <SkeletonLoader limit={3} />

  return (
    <div className="flex items-start justify-start flex-col gap-y-2 place-self-start">
      <span className="flex items-start justify-between flex-col md:flex-row w-full">
        <SelectOption
          handleSelectChange={handleSelectChange}
          selectedLanguage={selectedLanguage}
          uniqueLanguagesArray={uniqueLanguagesArray}
        />
      </span>

      <SelectLanguage
        characters={data}
        selectedLanguage={selectedLanguage}
      />

      {data.length > 9 && <Button onClick={handleOpen}>View All</Button>}

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
            <span className="flex flex-wrap items-start justify-start gap-x-16 gap-y-6 pr-6 w-full h-full overflow-auto">
              <SelectLanguage
                characters={filteredChars}
                selectedLanguage={selectedLanguage}
                upto={filteredChars.length}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
