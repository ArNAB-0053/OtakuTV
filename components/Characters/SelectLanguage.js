import FetchCharacters from "./FetchCharacters";
import FetchVoiceActor from "./FetchVoiceActor";

const SelectLanguage = ({ characters, selectedLanguage, upto = 3 }) => {
  return (
    <span className="grid grid-cols-1 w-full">
      {characters.length > 0 &&
        characters.slice(0, upto).map((character, index) => {
          const selectedVoiceActor =
            selectedLanguage !== "all"
              ? character.voice_actors.find(
                  (va) =>
                    va.language.toLowerCase() === selectedLanguage.toLowerCase()
                )
              : character.voice_actors[0]; // Default to first voice actor if "all" is selected

          return (
            <>
              <div
                key={character.character.mal_id}
                className="flex flex-wrap mb-3 mt-4 md:grid md:grid-cols-3 w-full"
              >
                <span>
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
                  <div className="w-full flex mt-[-1rem] md:mt-0 items-start justify-end col-span-1 md:col-span-2">
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
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-end ml-[-3rem] col-span-1 md:col-span-2">
                    <span className="w-[1rem] h-[1px] bg-white/40"></span>
                  </div>
                )}
              </div>
              {index < upto - 1 && (
                <div className="w-full h-[0.1px] bg-white/20"></div>
              )}
            </>
          );
        })}
    </span>
  );
};

export default SelectLanguage;
