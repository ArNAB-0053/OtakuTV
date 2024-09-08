"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ViewFav = ({ userID }) => {
  const { isSignedIn } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/Fav?userID=${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        //   console.log(data)
        setFavorites(data.favorites);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchFavorites();
    }
  }, [userID]);

  if (!isSignedIn) return <div>Please sign in to view your favorites.</div>;
  if (error) return <div>Error loading favorites</div>;
  if (!favorites) return <div>Loading...</div>;

  return (
    <div className="">
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 w-full h-full place-items-center overflow-hidden">
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li key={favorite._id} className="w-full h-[17rem]">
              <Image
                src={favorite.imageUrl}
                alt={favorite.animeName}
                width={1200}
                height={1200}
                className="h-[15rem] w-full object-cover rounded-md"
              />
              <h2 className="w-full truncate text-center mt-2 font-normal">
                {favorite.animeName}
              </h2>
            </li>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewFav;
