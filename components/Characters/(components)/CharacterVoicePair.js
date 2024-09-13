import FetchCharacters from "./FetchCharacters";
import FetchVoiceActor from "./FetchVoiceActor";

const CharacterVoicePair = ({ character, selectedLanguage }) => {
  const selectedVoiceActor =
    selectedLanguage !== "all"
      ? character.voice_actors.find(
          (va) =>
            va.language.toLowerCase() === selectedLanguage.toLowerCase()
        )
      : character.voice_actors[0]; // Default to first voice actor if "all" is selected

  return (
    <div className="flex flex-wrap mb-3 mt-4 md:grid md:grid-cols-6 w-full gap-4">
      <span className="col-span-3">
        <FetchCharacters
          char_image_url={character.character?.images?.jpg?.image_url}
          char_name={character.character?.name.replace(/,/g, "")}
          role={character && character.role}
        />
      </span>
      <span className="col-span-3">
        {selectedVoiceActor ? (
          <FetchVoiceActor
            vc_image_url={selectedVoiceActor.person?.images?.jpg?.image_url}
            vc_name={selectedVoiceActor?.person?.name.replace(/,/g, "")}
            lang={selectedVoiceActor?.language || "N/A"}
          />
        ) : (
          <span className="w-full flex items-center justify-end ml-[-3rem] col-span-1 md:col-span-2">
            <span className="w-[1rem] h-[1px] dark:bg-white/40 bg-black/50"></span>
          </span>
        )}
      </span>
    </div>
  );
};

export default CharacterVoicePair;
