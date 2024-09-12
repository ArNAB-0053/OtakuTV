import Image from "next/image";
import Link from "next/link";
import PaginationForAll from "./Pagination";
import { rated } from "@/components/SimpleComponents";
import { TbTriangleFilled } from "react-icons/tb";
import { useDeviceWidthContext } from "@/context/page";
import { useState, useEffect } from "react";

const Animes = ({
  animeLink,
  animeList,
  handlePageChange,
  page,
  totalPages,
}) => {
  const rating = rated;

  const [limit, setLimit] = useState(6);
  const [noRow, setNoRow] = useState(6);
  const deviceWidth = useDeviceWidthContext();
  useEffect(() => {
    if (deviceWidth == "md") {
      setLimit(16);
      setNoRow(4);
    } else if (deviceWidth == "lg") {
      setLimit(20);
      setNoRow(4);
    } else if (deviceWidth == "sm") {
      setLimit(10);
      setNoRow(5);
    } else if (deviceWidth == "xl") {
      setLimit(20);
      setNoRow(4);
    } else {
      setLimit(21);
      setNoRow(3);
    }
  }, [deviceWidth]);

  const roundedValue = Math.ceil(limit / noRow);

  return (
    <div className="flex items-center justify-center flex-col padding w-screen">
      <div
        className={`grid gap-6 w-full max-w-screen-xl mx-auto h-full
          ${
            animeList.length > roundedValue
              ? "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"
              : `grid-cols-${roundedValue}`
          } 
        `}
      >
        {animeList?.map((anime) => (
          <Link
            href={`${animeLink}/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col mb-4 relative group"
          >
            <span className="w-full aspect-[3/4] rounded-sm overflow-hidden relative">
              <Image
                src={anime.images.jpg.image_url}
                layout="fill"
                objectFit="cover"
                className="animation"
                alt={anime.title_english || anime.title}
              />
              <span className="inset-0 absolute infoHover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <TbTriangleFilled
                  className="rotate-90"
                  size={36}
                  color="#ffffff"
                />
              </span>
            </span>
            <h2 className="mt-2 truncate w-full text-center text-sm">
              {anime.title_english || anime.title}
            </h2>
            {["R-17+", "R+", "RX"].includes(rating[anime.rating]) && (
              <p className="absolute left-0 top-0 bg-[#ff0000]/80 text-white/80 font-semibold text-[0.7rem] px-1 py-[1px] rounded-ss-sm">
                18+
              </p>
            )}
          </Link>
        ))}
      </div>
      <PaginationForAll
        handlePageChange={handlePageChange}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Animes;
