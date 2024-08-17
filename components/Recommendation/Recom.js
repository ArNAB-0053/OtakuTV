"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Recom = ({ animeId }) => {
  const [recom, setRecom] = useState([]);

  const getRecommendation = async (animeID) => {
    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeID}/recommendations`
      );
      const data = res.data.data;
      console.log(data[0].entry.mal_id);
      setRecom(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(recom)
  useEffect(() => {
    // console.log(animeId);
    getRecommendation(animeId);
  }, []);

  return (
    <div className="w-full md:w-[90%] lg:w-[80%] place-items-start pb-16 flex flex-col items-start justify-start">
      <h1 className="text-3xl font-bold mb-4 uppercase">Recommended</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 w-full md:w-[95%] lg:w-[83%] xl:w-[84%] gap-y-4 gap-x-6">
        {recom &&
          recom.length > 0 &&
          recom.slice(0, 8).map((recomm) => {
            return (
              <Link
              href={`${recomm.entry?.mal_id}`}
                key={recomm.entry?.mal_id}
                className="flex items-center justify-start flex-col w-full gap-y-3"
              >
                <Image
                  src={recomm.entry?.images?.jpg?.large_image_url}
                  width={200}
                  height={200}
                  className="h-[80%] aspect-[9/16] rounded-[0.6rem] object-cover object-top"
                  alt={recomm.entry?.title}
                />
                <p className="w-full truncate text-ellipsis text-center">{recomm.entry?.title.length > 17 ? recomm.entry?.title.slice(0, 17) + "...": recomm.entry?.title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Recom;
