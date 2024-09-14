"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Duration, rated } from "@/components/SimpleComponents";
import Link from "next/link";
import useSWR from 'swr'
import SemiDetails from "./SemiDetails";
import SkeletonLoader from "./loading";
import { list } from "postcss";

// eslint-disable-next-line @next/next/no-async-client-component

const fetcher = url => axios.get(url).then(res => res.data.data);

const TopAnime = () => {
  // const [data, setdata] = useState([]);
  const rating = rated;

  const limit = 10;
  const { data, error } = useSWR(`https://api.jikan.moe/v4/top/anime?page=1&limit=${limit}`, fetcher)

  if(error) return <SkeletonLoader limit={limit}/>
  if(!data) return <SkeletonLoader limit={limit}/>

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col">
        {data?.map((anime, index) => {
          return index == 0 ? (
            <Link href={`${anime?.mal_id}`} className="mb-4  group">
              <div className="w-full dark:bg-white bg-[#272e41] flex relative ">
                <div className="w-[75%] h-auto overflow-hidden">
                  {anime.images?.jpg?.large_image_url && (
                    <Image
                      src={anime.images?.jpg?.large_image_url}
                      width={2400}
                      height={2400}
                      className="w-full aspect-[5/3] object-cover scale-105  group-hover:scale-[1.07] group-hover:contrast-110 animation"
                      alt={anime.title_english || anime.title}
                    />
                  )}
                </div>
                <div className="absolute bottom-3 right-8 text-5xl text-red-500">
                  <strong>0{index + 1}</strong>
                  <p className="bg-red-500 h-1 w-[3.2rem]"></p>
                </div>
              </div>
              <span className="flex flex-col py-4 px-2 gap-y-3 bg-bgtop group-hover:bg-[#2126358b] ">
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
            <SemiDetails anime={anime} rank={index < 9 ? `0${index + 1}` : index + 1} />
          );
        })}
      </div>
    </div>
  );
};

export default TopAnime;
