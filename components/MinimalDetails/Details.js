import Image from "next/image";
import React from "react";
import Star_rating from "@/components/Star_rating";
import { FaStar } from "react-icons/fa";
import Animedetail from "@/components/Animedetail";
import { useState } from "react";

const Details = ({ anime }) => {
  const [showMore, setShowMore] = useState(false);
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
    <div key={anime.mal_id} className=" flex items-center justify-center">
      <div className="w-full h-auto grid grid-cols-1 grid-rows-1 md:grid-cols-[17rem_1fr] lg:grid-cols-[22rem_1fr] lg:grid-rows-2">
        <div className="w-[55%] md:mt-4 md:w-[13rem] lg:w-[19rem] h-auto lg:row-span-2">
          {anime.images &&
            anime.images.jpg &&
            anime.images.jpg.large_image_url && (
              <Image
                src={anime.images?.jpg?.large_image_url}
                width={200}
                height={200}
                className="w-full rounded-[0.6rem]"
                alt={anime.title_english || anime.title}
              />
            )}
        </div>
        <div className="text-sm h-fit flex items-start justify-start flex-col gap-y-4">
          {/* <p className="bg-rank text-sm font-semibold text-white px-4 py-1 rounded">
              <>Rank: </>
              {anime.rank}
            </p> */}
          <span className="mt-4 md:mt-0 text-start flex items-center justify-start text-xl md:text-2xl lg:text-5xl gap-x-2 ">
            <h1 className="font-bold flex text-muted-foreground uppercase">
              {anime.title_english || anime.title}
            </h1>
          </span>

          <div className="flex items-center justify-start space-x-3 text-destructive">
            <span className="bg-[#ff0000] px-3 rounded-[2px] py-[5px] text-white font-semibold">
              {anime.type}
            </span>
            <span className="border-bgitem border-solid border px-3 rounded-[2px] py-[5px]">
              {ratingDescriptions[anime.rating] || "Unknown"}
            </span>
            <span className="bg-bgitem px-3 rounded-[2px] py-[5px]">
              {durationDetails()}
            </span>
            <p className="bg-bgitem px-3 py-[5px]">
              {(anime.demographics && anime.demographics[0]?.name) || "N/A"}
            </p>
          </div>

          <div className="w-full md:w-[17rem] h-24 border-gray-500 border flex items-center justify-center flex-col gap-y-2 rounded-[2px] py-[2px]">
            <Star_rating stars={anime.score / 2} />
            <span className="h-[1px] w-full bg-muted"></span>
            <span className="flex text-muted items-center justify-center gap-2 text-md">
              <FaStar color="red" />
              <span className="tracking-wide flex items-start gap-1 font-stretch-200">
                <strong>{anime.score}/10</strong> <p className="text-[#6D6D6D]">({anime.scored_by} votes)</p>
              </span>
            </span>
          </div>

          <span className={`${showMore ? "mb-4" : "mb-4"} text-destructive`}>
            {showMore
              ? anime.synopsis
              : anime.synopsis?.substring(0, 250) + "..."}
            <button
              className="font-bold text-xs bg-bgitem px-3 ml-1 py-[2px] font-[Gintronic]"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {showMore ? "less" : "more"}
            </button>
          </span>
        </div>
        <div className="">
          <Animedetail
            type={anime.type}
            season={
              anime.season?.charAt(0).toUpperCase() +
              anime.season?.slice(1).toLowerCase()
            }
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
              <span className="flex items-center justify-start flex-wrap gap-2">
                {anime.themes?.length > 0
                  ? anime.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="bg-bgitem min-w-24 flex items-center justify-center px-2 py-1 rounded"
                      >
                        {theme.name}
                      </span>
                    ))
                  : "N/A"}
              </span>
            }
            genres={
              <span className="flex items-center justify-start flex-wrap gap-2">
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
            producers={
              <span className="flex items-center justify-start flex-wrap gap-2">
                {anime.producers?.length > 0
                  ? anime.producers.map((producer, index) => (
                      <span
                        key={index}
                        className="border-l border-black dark:border-white border-r px-3"
                      >
                        {producer.name}
                      </span>
                    ))
                  : "N/A"}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
