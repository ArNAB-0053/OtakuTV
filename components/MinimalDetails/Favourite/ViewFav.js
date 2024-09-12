"use client";
import Image from "next/image";
import useSWR from "swr";
import Loading from "./loading";
import Error from "./error";
import Link from "next/link";
import DeleteFav from "./DeleteFav";
import { TbTriangleFilled } from "react-icons/tb";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewFav = ({ userID }) => {
  const { data, error, isLoading, mutate } = useSWR(
    userID ? `/api/Fav?userID=${userID}` : null,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading limit={21} />;

  if (!data?.favorites || data.favorites.length === 0) {
    return <p>No favorites found.</p>;
  }

  return (
    <div className="">
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 w-full h-full place-items-center overflow-hidden">
        {data.favorites.map((favorite) => (
          <Link
            href={`/anime/animedetails/${favorite.animeID}`}
            key={favorite._id}
            className="relative w-full h-[17rem] group flex items-center justify-center flex-col group"
          >
            <span className="h-[15rem] w-full rounded-sm overflow-hidden relative">
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
