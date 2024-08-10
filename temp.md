"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Star_rating from "@/components/Star_rating";
import { FaStar } from "react-icons/fa";
import Animedetail from "@/components/Animedetail";

const page = ({ params }) => {
  const { animeId } = params;
  const [anime, setAnime] = useState({});
  const [showMore, setShowMore] = useState(false);
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
    if (
      typeof duration !== "string" ||
      duration === "Unknown" ||
      duration === null
    ) {
      return "N/A";
    }
    let parts = [],
      inMin = 0;
    if (duration.includes("hr") && duration.includes("min")) {
      parts = duration.split(" ");
      const hr = parts[0];
      const minn = parts[2];
      inMin = Number(hr) * 60 + Number(minn);
      return inMin + " Min";
    }
    return duration.substring(0, 7);
  };

  return (
    <div className="w-screen p-6 lg:px-10 xl:px-28 lg:py-10">
      <div key={anime.mal_id} className="flex items-center justify-center">
        <div className="w-full h-auto grid grid-cols-[10rem_1fr] grid-rows-2 lg:grid-cols-[16rem_minmax(500px,_1fr)_200px] xl:grid-cols-[22rem_minmax(500px,_1fr)_200px] lg:grid-rows-1 ">
          <div className="w-[7rem] lg:w-[12rem] xl:w-[19rem] h-auto col-span-1 row-span-1">
            {anime.images &&
              anime.images.jpg &&
              anime.images.jpg.large_image_url && (
                <Image
                  src={anime.images.jpg.large_image_url}
                  width={200}
                  height={200}
                  className="w-full rounded-[0.6rem]"
                  alt={anime.title}
                />
              )}
          </div>
          <div className="text-sm lg:pr-10 row-start-2 col-span-2 lg:row-start-1 lg:col-start-2 lg:col-span-1 grid grid-cols-1 grid-rows-2">
            <div>
              <h1 className="text-start text-2xl">{anime.title_english}</h1>
              <div className="flex items-center justify-start space-x-3">
                <span className="bg-red-600 px-3 rounded-[2px] py-[2px]">
                  {anime.type}
                </span>
                <span className="border-gray-600/60 border-solid border px-3 rounded-[2px] py-[2px]">
                  {ratingDescriptions[anime.rating] || "Unknown"}
                </span>
                <span className="bg-[#262626] px-3 rounded-[2px] py-[2px]">
                  {durationDetails()}
                </span>
              </div>
              <span>
                {showMore
                  ? anime.synopsis
                  : anime.synopsis?.substring(0, 250) + "..."}
                <button
                  className="font-bold bg-red-600 px-3 py-[2px]"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "Less" : "More"}
                </button>
              </span>
            </div>
            <div>
              <Animedetail
                type={anime.type}
                season={anime.season?.charAt(0).toUpperCase() + anime.season?.slice(1).toLowerCase()}
                year={anime.year}
                premiered={anime.aired?.prop?.from.year || "N/A"}
                duration={durationDetails()}
                status={anime.status}
                studios={
                  anime.studios && anime.studios.length > 0
                    ? anime.studios.map((studio) => studio.name).join(", ")
                    : "N/A"
                }
                aired={anime.aired?.string}
                eps={anime.episodes}
                japanese={anime.title_japanese}
                themes={
                  <span className="flex items-center justify-start gap-2">
                    {anime.themes?.length > 0
                      ? anime.themes.map((theme, index) => (
                          <span
                            key={index}
                            className="bg-[#212121] min-w-24 flex items-center justify-center px-2 py-1 rounded-md"
                          >
                            {theme.name}
                          </span>
                        ))
                      : "N/A"}
                  </span>
                }
                genres={
                  <span className="flex items-center justify-center gap-2">
                    {anime.genres?.length > 0
                      ? anime.genres.map((genre, index) => (
                          <span
                            key={index}
                            className="border border-gray-300 px-2 py-1 rounded-md"
                          >
                            {genre.name}
                          </span>
                        ))
                      : "N/A"}
                  </span>
                }
              />
            </div>
          </div>
          <div className="w-full md:w-[30rem] lg:w-full max-h-24 col-span-1 row-span-1 border-gray-500 border flex items-center justify-center flex-col gap-y-2 rounded-[2px] py-[2px]">
            <Star_rating stars={anime.score / 2} />
            <span className="h-[1px] w-full bg-gray-500"></span>
            <span className="flex text-gray-500 items-center justify-center">
              <FaStar />
              {anime.score}/10({anime.scored_by} Votes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
