"use client";
import Image from "next/image";
import useSWR from "swr";
import Error from "./error";
import Link from "next/link";
import DeleteFav from "./DeleteFav";
import { TbTriangleFilled } from "react-icons/tb";
import SkeletonLoader from "./loading";
import NoFav from "./NoFav";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewFav = ({ userID }) => {
  const { data, error, isLoading, mutate } = useSWR(
    userID ? `/api/Fav?userID=${userID}` : null,
    fetcher
  );

  // Default value for length (e.g., 6) to be used in the loader before data is available
  const defaultLength = 10;
  const loaderLength = data?.favorites?.length || defaultLength;

  if (error) return <Error />;

  if (isLoading) {
    return (
      <div className="p-6 md:px-28 lg:px-32 xl:px-72 w-full">
        <SkeletonLoader
          limit={loaderLength}
          className={`grid 
            xl:${loaderLength < 5
            ? "grid-cols-5"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
            lg:${loaderLength < 5
            ? "grid-cols-5"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
            md:${loaderLength < 4
            ? "grid-cols-4"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
            sm:${loaderLength < 3
            ? "grid-cols-3"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
            max-sm:grid-cols-2 
            place-items-center gap-6 w-full h-full`}
        />
      </div>
    );
  }

  if (!data?.favorites || data.favorites.length === 0) {
    return <NoFav />;
  }

  return (
    <div className="p-6 md:px-28 lg:px-32 xl:px-72 w-full">
      <ul
        className={`grid 
          xl:${data.favorites.length < 5
            ? "grid-cols-5"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
          lg:${data.favorites.length < 5
            ? "grid-cols-5"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
          md:${data.favorites.length < 4
            ? "grid-cols-4"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
          sm:${data.favorites.length < 3
            ? "grid-cols-3"
            : "grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"}  
          max-sm:grid-cols-2 
          gap-6 w-full h-full place-items-center overflow-hidden`}
      >
        {data.favorites.map((favorite) => (
          <Link
            href={`/anime/animedetails/${favorite.animeID}`}
            key={favorite._id}
            className="relative w-full h-[19rem] group flex items-center justify-center flex-col group"
          >
            <span className="w-full aspect-[9/16] rounded-sm overflow-hidden relative">
              <Image
                src={favorite.imageUrl}
                alt={favorite.animeName}
                width={1200}
                height={1200}
                className="h-full w-full object-cover animation"
              />
              <span className="inset-0 absolute infoHover opacity-0 group-hover:opacity-100 transition-opacity duration-300 left-0 top-0 h-full w-full"></span>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <TbTriangleFilled
                  className="rotate-90"
                  size={36}
                  color="#ffffff"
                />
              </span>
            </span>
            <h3 className="w-full truncate text-center mt-2 font-normal">
              {favorite.animeName}
            </h3>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <DeleteFav
                userID={userID}
                animeID={favorite.animeID}
                onDelete={() => mutate()} // Refresh the list after deletion
              />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ViewFav;
