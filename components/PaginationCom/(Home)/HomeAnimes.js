import Image from "next/image";
import Link from "next/link";
import PaginationHome from "./Pagination";
import { rated } from "@/components/SimpleComponents";
import { TbTriangleFilled } from "react-icons/tb";

const HomeAnimes = ({
  animeLink,
  animeList,
  handlePageChange,
  page,
  totalPages,
}) => {
  const rating = rated;
  return (
    <div className="flex items-center justify-center flex-col padding w-screen">
      <span className="flex w-full justify-between items-center">
        <p className="text-2xl uppercase leading-6 font-bold font-[Macondo]">
          Most Popular
        </p>
        <PaginationHome
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
      </span>
      <div className="grid max-sm:grid-cols-2 mt-6 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-6 w-full h-full">
        {animeList?.map((anime) => (
          <Link
            href={`${animeLink}/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col mb-4 relative group"
          >
            <span className="w-full h-full rounded-sm overflow-hidden relative">
              <Image
                src={anime.images.jpg.image_url}
                width={1200}
                height={1200}
                className="w-full h-full object-cover animation"
                alt={anime.title_english || anime.title}
              />
              <span className="inset-0 absolute infoHover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <TbTriangleFilled
                  className="rotate-90"
                  size={36}
                  color="#ffffff"
                />
              </span>
            </span>

            <h2 className="mt-2 truncate w-36 text-center">
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
    </div>
  );
};

export default HomeAnimes;
