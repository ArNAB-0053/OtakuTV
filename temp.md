"use client";
import Image from "next/image";
import React from "react";
import Star_rating from "@/components/Star_rating";
import { FaStar } from "react-icons/fa";
import Animedetail from "@/components/MinimalDetails/Animedetail";
import { useState } from "react";
import { Duration, rated } from "../SimpleComponents";
import Fav from "./Favourite/AddFav";
import SkeletonLoader from "./loading";

const Details = ({ anime }) => {
  const [showMore, setShowMore] = useState(false);
  const ratingDescriptions = rated;
  const durationDetails = Duration(anime.duration);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false); // Set to false when image is loaded
  };
  return (
    <div
      key={anime.mal_id}
      className="relative flex items-center justify-center flex-col"
    >
      <div className="absolute -z-20 -top-36 overflow-hidden">
        <div className="relative w-screen h-[40rem] md:h-[47rem]">
          {anime.images?.jpg?.large_image_url && (
            <Image
              src={
                anime.images?.jpg?.large_image_url ||
                anime.images?.jpg?.image_url
              }
              width={2400}
              height={2400}
              className="absolute inset-0 w-full h-full -z-10 object-cover"
              alt={anime.title_english || anime.title}
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-[50%] md:h-[80%] lg:h-[120%] bg-gradient-to-t from-background to-transparent"></div>
          {/* <div className="absolute bottom-0 left-0 w-[100%] h-[70%] bg-gradient-to-t from-background to-transparent"></div> */}
          <div className="viewallstaff bg-[#151923]/50 -z-10 absolute w-screen h-[150vh]"></div>
        </div>
      </div>
      <div className="w-full mt-[10rem] md:mt-[17rem] xl:mt-[18rem] h-auto grid grid-cols-1 grid-rows-1 md:grid-cols-[17rem_1fr] lg:grid-cols-[22rem_1fr] lg:grid-rows-1 place-items-center md:place-items-start">
        <span className="flex flex-col w-[55%] md:mt-2 md:w-[13rem] lg:w-[19rem] h-auto lg:row-span-2 relative">
          {anime.images?.jpg?.large_image_url && (
            <>
              {isLoading && <SkeletonLoader />}
              <span className="w-full flex items-center justify-center">
                <Image
                  src={
                    anime.images?.jpg?.large_image_url ||
                    anime.images?.jpg?.image_url
                  }
                  width={1200}
                  height={1200}
                  className="w-full aspect-[3/4] object-cover rounded-[0.6rem]"
                  alt={anime.title_english || anime.title}
                  onLoadingComplete={handleImageLoad}
                />
                {/* <SkeletonLoader /> */}
              </span>
              {!isLoading && (
                <Fav
                  animeID={anime.mal_id}
                  animeName={anime.title_english || anime.title}
                  imageUrl={
                    anime.images?.jpg?.large_image_url ||
                    anime.images?.jpg?.image_url ||
                    ""
                  }
                />
              )}
            </>
          )}
        </span>
        <div className="text-sm flex items-start justify-start flex-col gap-y-4 w-full max-md:mt-16">
          <div className="w-full flex items-start justify-start h-fit flex-col gap-y-5 xl:flex-row">
            <div className="w-full flex items-center md:items-start justify-start flex-col gap-y-4 h-fit">
              <span className="mt-4 md:mt-0 text-start flex items-center justify-center text-xl md:text-2xl lg:text-4xl gap-x-2 ">
                <h1 className="font-bold flex text-start text-muted-foreground uppercase">
                  {anime.title_english || anime.title}
                </h1>
              </span>

              <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                <span className="bg-[#ff0000] px-3 rounded-[2px] py-[5px] text-white font-semibold">
                  {anime.type}
                </span>
                <span className="border-destructive border-solid border px-3 rounded-[2px] py-[5px]">
                  {ratingDescriptions[anime.rating] || "Unknown"}
                </span>
                <span className="bg-blue-800 text-white px-3 rounded-[2px] py-[5px]">
                  {durationDetails}
                </span>
                <p className="bg-green-600 text-white px-3 py-[5px]">
                  {(anime.demographics && anime.demographics[0]?.name) || "N/A"}
                </p>
              </div>
            </div>

            <div className="w-full md:w-[17rem] h-24 border-rating border flex items-center justify-center flex-col gap-y-2 rounded-[2px] py-[2px]">
              <Star_rating stars={anime.score / 2} />
              <span className="h-[1px] w-full bg-black dark:bg-rating"></span>
              <span className="flex text-muted-foreground items-center justify-center gap-2 text-md">
                <FaStar color="red" />
                <span className="tracking-wide flex items-start gap-1 font-stretch-200">
                  <strong>{anime.score ? `${anime.score}/10` : "N/A"}</strong>{" "}
                  <p className="">
                    {anime.scored_by && `(${anime.scored_by} votes)`}
                  </p>
                </span>
              </span>
            </div>
          </div>

          <span className="text-destructive-foreground h-fit">
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
        <div
          className={`w-full flex h-full items-start justify-between flex-col `}
        >
          <Animedetail
            type={anime.type}
            season={
              anime.season?.charAt(0).toUpperCase() +
              anime.season?.slice(1).toLowerCase()
            }
            year={anime.year}
            premiered={anime.aired?.prop?.from.year || "N/A"}
            duration={durationDetails}
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
                        className="min-w-24 flex items-center justify-center px-2 py-1 rounded border border-bgitem"
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
                        className="bg-bgitem px-2 py-1 rounded-md"
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
                        className="border border-muted rounded py-1 px-3"
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
