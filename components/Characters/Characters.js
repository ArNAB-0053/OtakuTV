"use client";
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
import ViewAll from "./(components)/ViewAll";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const Characters = ({ animeID }) => {
  const [uniqueLanguages, setUniqueLanguages] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeID}/characters`,
    fetcher
  );

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

  if (error) return <SkeletonLoader limit={3} />;
  if (!data) return <SkeletonLoader limit={3} />;

  return (
    <div className="flex items-start justify-start flex-col gap-y-2 place-self-start">
      <span className="flex items-start justify-between flex-col md:flex-row w-full">
        <SelectOption
          handleSelectChange={handleSelectChange}
          selectedLanguage={selectedLanguage}
          uniqueLanguagesArray={uniqueLanguagesArray}
        />
      </span>

      <SelectLanguage characters={data} selectedLanguage={selectedLanguage} />

      {data.length > 9 && <Button onClick={handleOpen}>View All</Button>}

      <ViewAll
        isViewingAll={isViewingAll}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        searchTerm={searchTerm}
        selectedLanguage={selectedLanguage}
        uniqueLanguagesArray={uniqueLanguagesArray}
        handleClose={handleClose}
        filteredChars={filteredChars}
      />
    </div>
  );
};

export default Characters;
