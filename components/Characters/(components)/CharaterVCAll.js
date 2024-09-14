import React, { useState, useEffect } from 'react';
import FetchCharacters from "./FetchCharacters";
import FetchVoiceActor from "./FetchVoiceActor";
import PaginationComponent from './PaginationComponent';

const CharacterVC = ({ characters, selectedLanguage, itemsPerPage = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedCharacters, setPaginatedCharacters] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedCharacters(characters.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, characters]);

  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="w-full overflow-y-auto scrollbar-none scroll-smooth flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-4">
          {paginatedCharacters.map((character) => {
            const selectedVoiceActor =
              selectedLanguage !== "all"
                ? character.voice_actors.find(
                    (va) =>
                      va.language.toLowerCase() === selectedLanguage.toLowerCase()
                  )
                : character.voice_actors[0];

            return (
              <div
                key={character.character.mal_id}
                className="flex items-start justify-between w-full bg-[#30303085] rounded-md p-4"
              >
                <span className="flex-1">
                  <FetchCharacters
                    char_image_url={character.character?.images?.jpg?.image_url}
                    char_name={
                      character.character?.name.length > 40
                        ? character.character?.name.slice(0, 40) + "..."
                        : character.character?.name.replace(/,/g, "")
                    }
                    role={character && character.role}
                  />
                </span>

                {selectedVoiceActor ? (
                  <span className="flex-1 flex items-start justify-end">
                    <FetchVoiceActor
                      vc_image_url={
                        selectedVoiceActor.person?.images?.jpg?.image_url
                      }
                      vc_name={selectedVoiceActor?.person?.name.replace(
                        /,/g,
                        ""
                      )}
                      lang={selectedVoiceActor?.language || "N/A"}
                    />
                  </span>
                ) : (
                  <span className="flex-1 flex items-center justify-end">
                    <span className="w-[1rem] h-[1px] dark:bg-white/40 bg-black/50"></span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="py-2 bg-[#1c1c1ccf]">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterVC;