import Link from "next/link";
import { Duration, rated } from "@/components/SimpleComponents";
import Image from "next/image";

const SemiDetails = ({anime, rank}) => {
  return (
    <Link
      href={`${anime?.mal_id}`}
      className="w-full flex gap-4 items-center justify-start mb-4 bg-bgtop hover:bg-[#2126358b]"
    >
      <div className="w-[4.5rem] aspect-[3/4]">
        {anime?.images?.jpg?.large_image_url && (
          <Image
            src={anime?.images?.jpg?.large_image_url}
            width={2400}
            height={2400}
            className="w-full aspect-[3/4] object-fill"
            alt={anime.title_english || anime.title}
          />
        )}
      </div>
      <div className="p-3 w-[calc(100%-4.5rem)] flex items-start justify-center gap-y-3 flex-col relative">
        <p className="w-full truncate">
          {anime?.title_english || anime?.title}
        </p>
        <span className="flex gap-x-4 text-xs text-destructive">
          <p className="px-2 py-1 bg-bgitem rounded">{anime.type}</p>
          <p className="px-2 py-1 bg-bgitem rounded">
            {Duration(anime.duration)}
          </p>
          <p className="px-2 py-1 bg-bgitem rounded">
            {rated[anime.rating] || "Unknown"}
          </p>
        </span>
        <p className="absolute right-0 -bottom-1 px-2 py-1 w-[2.3rem] text-center text-white bg-red-500 dark:bg-red-600 font-semibold">
          {rank}
        </p>
      </div>
    </Link>
  );
};

export default SemiDetails;
