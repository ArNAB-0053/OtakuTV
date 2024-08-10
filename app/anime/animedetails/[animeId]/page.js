"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { animeId } = params;
  const [anime, setAnime] = useState({});
  const getAnime = async (animeID) => {
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${animeID}`);
      const data = res.data.data;
      // console.log(data.images.jpg.image_url);
      setAnime(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(animeId);
    getAnime(animeId);
  }, []);

  const ratingDescriptions = {
    "PG-13 - Teens 13 or older": "PG-13",
    "R - 17+ (violence & profanity)": "R-17+",
    "R+ - Mild Nudity": "R+",
    "PG - Children": "PG",
    "G - All Ages": "G",
    "Rx - Hentai": "RX",
  };
  
  const durationDetails = () => {
    const duration = anime.duration;
    // const hours = Math.floor(duration / 60);
    if (typeof duration !== 'string' || duration === "Unknown" || duration === null) {
      return "N/A";
    }
    let parts = [], inMin = 0;
    if (duration.includes("hr") && duration.includes("min")) {
      parts = duration.split(" ");
      const hr = parts[0];
      const minn = parts[2];
      inMin = Number(hr)*60 + Number(minn)
      return inMin + " Min"
    }
    return duration.substring(0, 7)
  }

  return (
    <div className="w-screen">
      <div key={anime.mal_id} className="flex items-center justify-center">
        <div className="w-[60%] h-auto p-6  flex items-start justify-start">
          <div className="flex items-center justify-center flex-col min-w-[15rem] h-auto">
            {anime.images && anime.images.jpg && anime.images.jpg.image_url && (
              <Image
                src={anime.images.jpg.image_url}
                width={200}
                height={200}
                className="w-full h-full rounded-[1rem]"
                alt={anime.title}
              />
            )}
          </div>
          <div className="">
            <h1 className="text-start text-2xl">{anime.title_english}</h1>
            <span className="">{anime.rank}</span>
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-red-600 px-3 py-1">{anime.type}</span>
              <span className="bg-green-600 px-3 py-1">
                {ratingDescriptions[anime.rating] || "Unknown"}
              </span>
              <span className="bg-blue-600 px-3 py-1">
                {durationDetails()}
              </span>
              <span className="bg-yellow-600 px-3 py-1">{anime.score}</span>
            </div>
            <span>{anime.episodes}</span>
            <span>{anime.synopsis}</span>
          </div>
        </div>
        <div className="w-[40%] bg-white h-64"></div>
      </div>
    </div>
  );
};

export default page;
