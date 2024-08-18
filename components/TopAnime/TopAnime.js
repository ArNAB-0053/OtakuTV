"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Duration, rated } from "../SimpleComponents";
import Link from "next/link";
import useSWR from 'swr'

// eslint-disable-next-line @next/next/no-async-client-component

const fetcher = url => axios.get(url).then(res => res.data.data);

const TopAnime = () => {
  // const [data, setdata] = useState([]);
  const rating = rated;

  const { data, error } = useSWR("https://api.jikan.moe/v4/top/anime?page=1&limit=15", fetcher)

  if(error) return "An Error"
  if(!data) return "Loading..."

  return (
    <div className="flex flex-col max-xl:hidden">
      <h1 className="text-3xl font-bold mb-4 uppercase">Top Anime</h1>
      <div className="flex flex-col">
        {data?.map((anime, index) => {
          return index == 0 ? (
            <Link href={`${anime?.mal_id}`} className="mb-4">
              <div className="w-full dark:bg-white bg-[#272e41] flex relative">
                <div className="w-[75%] h-auto">
                  {anime.images?.jpg?.large_image_url && (
                    <Image
                      src={anime.images?.jpg?.large_image_url}
                      width={2400}
                      height={2400}
                      className="w-full aspect-[5/3] object-cover"
                      alt={anime.title_english || anime.title}
                    />
                  )}
                </div>
                <div className="absolute bottom-3 right-8 text-5xl text-red-500">
                  <strong>0{index + 1}</strong>
                  <p className="bg-red-500 h-1 w-[3.2rem]"></p>
                </div>
              </div>
              <span className="flex flex-col py-4 px-2 gap-y-3 bg-bgtop">
                <p className="w-full truncate">
                  {anime?.title_english || anime?.title}
                </p>
                <span className="flex gap-x-4 text-xs text-destructive">
                  <p className="px-2 py-1 bg-bgitem rounded">{anime.type}</p>
                  <p className="px-2 py-1 bg-bgitem rounded">
                    {Duration(anime.duration)}
                  </p>
                  <p className="px-2 py-1 bg-bgitem rounded">
                    {rating[anime.rating] || "Unknown"}
                  </p>
                </span>
              </span>
            </Link>
          ) : (
            <Link
              href={`${anime?.mal_id}`}
              className="w-full flex gap-4 items-center justify-start mb-4 bg-bgtop"
            >
              <div className="w-[4.5rem] aspect-[3/4]">
                {anime.images?.jpg?.large_image_url && (
                  <Image
                    src={anime.images?.jpg?.large_image_url}
                    width={2400}
                    height={2400}
                    className="w-full aspect-[3/4] object-fill"
                    alt={anime.title_english || anime.title}
                  />
                )}
              </div>
              <div className="p-3 w-[calc(100%-4.5rem)] flex items-start justify-center gap-y-3 flex-col relative">
                <p className="w-full truncate">
                  {anime?.title_english || anime?.title}
                </p>
                <span className="flex gap-x-4 text-xs text-destructive">
                  <p className="px-2 py-1 bg-bgitem rounded">{anime.type}</p>
                  <p className="px-2 py-1 bg-bgitem rounded">
                    {Duration(anime.duration)}
                  </p>
                  <p className="px-2 py-1 bg-bgitem rounded">
                    {rating[anime.rating] || "Unknown"}
                  </p>
                </span>
                <p className="absolute right-0 -bottom-1 px-2 py-1 w-[2.3rem] text-center text-white bg-red-500 dark:bg-red-600 font-semibold">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopAnime;
