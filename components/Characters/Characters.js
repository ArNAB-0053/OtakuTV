import { useState, useEffect } from "react";
import FetchCharacters from "./FetchCharacters";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FetchVoiceActor from "./FetchVoiceActor";

const Characters = ({ animeID }) => {
  const [characters, setCharacters] = useState([]);
  const [uniqueLanguages, setUniqueLanguages] = useState(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const getCharacters = async (animeID) => {
    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeID}/characters`
      );
      const data = res.data.data;
      setCharacters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters(animeID);
  }, [animeID]);

  useEffect(() => {
    const fetchLanguages = () => {
      const languages =
        characters?.flatMap((character) =>
          character.voice_actors?.map((vc) => vc.language)
        ) || [];
      const uniqueLanguagesSet = new Set(languages);
      setUniqueLanguages(uniqueLanguagesSet);
    };

    fetchLanguages();
  }, [characters]);

  const uniqueLanguagesArray = [...uniqueLanguages];

  const handleSelectChange = (value) => {
    setSelectedLanguage(value);
  };

  return (
    <div className="flex items-start justify-start flex-col gap-y-6 place-self-start">
      <span className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold mb-4">Characters</h1>
        <Select onValueChange={handleSelectChange} value={selectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>{" "}
            {/* Changed value to "all" */}
            {uniqueLanguagesArray.map((lang) => (
              <SelectItem key={lang} value={lang.toLowerCase()}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </span>

      <span className="grid grid-cols-1 w-full">
        {characters.length > 0 &&
          characters.slice(0, 4).map((character) => {
            const selectedVoiceActor =
              selectedLanguage !== "all"
                ? character.voice_actors.find(
                    (va) =>
                      va.language.toLowerCase() ===
                      selectedLanguage.toLowerCase()
                  )
                : character.voice_actors[0]; // Default to first voice actor if "all" is selected

            return (
              <div
                key={character.character.mal_id}
                className="grid grid-cols-2 md:grid-cols-3 w-full"
              >
                <FetchCharacters
                  char_image_url={character.character?.images?.jpg?.image_url}
                  char_name={character.character?.name}
                  role={character && character.role}
                />
                {selectedVoiceActor ? (
                  <div className="w-full flex items-start justify-end col-span-1 md:col-span-2">
                    <FetchVoiceActor
                      vc_image_url={
                        selectedVoiceActor.person?.images?.jpg?.image_url
                      }
                      vc_name={selectedVoiceActor?.person?.name}
                      lang={selectedVoiceActor?.language || "N/A"}
                    />
                  </div>
                ) : (
                  <div className="text-end w-[2rem] ml-[20%] mt-[4%]">-</div>
                )}
              </div>
            );
          })}
      </span>
    </div>
  );
};

export default Characters;
