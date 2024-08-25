import Image from "next/image";
import Link from "next/link";
import PaginationHome from "./Pagination";

const HomeAnimes = ({
  animeLink,
  animeList,
  handlePageChange,
  page,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-center flex-col padding w-screen">
      <span className="flex w-full justify-between items-center">
        <p className="text-2xl uppercase leading-6 font-bold font-[Macondo]">Most Popular</p>
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
            className="flex items-center justify-center flex-col mb-4"
          >
            <Image
              src={anime.images.jpg.image_url}
              width={1200}
              height={1200}
              className="w-full h-full  object-cover "
              alt={anime.title_english || anime.title}
            />

            <h2 className="mt-2 truncate w-36 text-center">
              {anime.title_english || anime.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeAnimes;
