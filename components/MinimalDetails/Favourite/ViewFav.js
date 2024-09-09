"use client";
import Image from "next/image";
import useSWR from "swr";
import Loading from "./loading";
import Error from "./error";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewFav = ({ userID }) => {
  const { data, error, isLoading } = useSWR(
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
          <Link href={`/anime/animedetails/${favorite.animeID}`} key={favorite._id} className="w-full h-[17rem]">
            <Image
              src={favorite.imageUrl}
              alt={favorite.animeName}
              width={1200}
              height={1200}
              className="h-[15rem] w-full object-cover rounded-md"
            />
            <h3 className="w-full truncate text-center mt-2 font-normal">
              {favorite.animeName}
            </h3>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ViewFav;
