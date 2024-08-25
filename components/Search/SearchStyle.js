import Link from "next/link";
import { Duration, rated } from "@/components/SimpleComponents";
import Image from "next/image";

const SearchStyle = ({
  anime,
  index,
  widthpara = "max-sm:w-[40vw] w-[20rem] md:w-[35rem]",
}) => {
  return (
    <Link
      href={`/anime/animedetails/${anime?.mal_id}`}
      className={`w-full flex gap-x-4 items-center justify-center py-2 px-3 hover:bg-black/40 ${
        index % 2 === 0 ? "bg-[#212635]" : "bg-bgitem"
      }`}
    >
      <div className="w-[4.8rem]">
        {anime?.images?.jpg?.large_image_url && (
          <Image
            src={anime?.images?.jpg?.large_image_url}
            width={2400}
            height={2400}
            className="w-[4.5rem] h-[5.5rem] aspect-[1/4] object-fill rounded-sm"
            alt={anime.title_english || anime.title}
          />
        )}
      </div>
      <div className="w-[calc(100%-4.5rem)] text-white/40 flex items-start -mt-3 justify-center gap-y-1 flex-col relative">
        <p className={`${widthpara} truncate text-sm text-white/80`}>
          {anime?.title_english || anime?.title}
        </p>
        <p className={`${widthpara} truncate text-xs`}>{anime?.synopsis}</p>
        <span className="flex gap-x-4 text-xs searchstylespan">
          <p
            className={`px-2 py-1 rounded ${
              index % 2 === 0 ? "bg-bgitem" : "bg-[#212635]"
            } `}
          >
            {anime.type}
          </p>
          <p
            className={`px-2 py-1 rounded ${
              index % 2 === 0 ? "bg-bgitem" : "bg-[#212635]"
            } `}
          >
            {Duration(anime.duration)}
          </p>
          <p
            className={`px-2 py-1 rounded ${
              index % 2 === 0 ? "bg-bgitem" : "bg-[#212635]"
            } `}
          >
            {rated[anime.rating] || "Unknown"}
          </p>
        </span>
      </div>
    </Link>
  );
};

export default SearchStyle;
