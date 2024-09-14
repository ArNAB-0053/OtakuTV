"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import SkeletonLoader from "./loading";
import { TbTriangleFilled } from "react-icons/tb";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const Recom = ({ animeId }) => {
  const { data, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeId}/recommendations`,
    fetcher
  );

  if (error) return <SkeletonLoader limit={14} />;
  if (!data) return <SkeletonLoader limit={14} />;

  return (
    <div className="w-full place-items-start pb-16 flex flex-col items-start justify-start">
      {!data ||
        (data.length === 0 && (
          <div className="w-full bg text-xs text-destructive inline-block">
            No Recommendation Found!! 😔
          </div>
        ))}
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-6 w-full h-full ">
        {data && data.length > 3
          ? data.slice(0, 10).map((recomm) => {
              return (
                <Link
                  href={`${recomm.entry?.mal_id}`}
                  key={recomm.entry?.mal_id}
                  className="flex items-start justify-start flex-col w-full gap-y-3 relative group"
                >
                  <span className="w-full h-full rounded-sm overflow-hidden relative">
                    <Image
                      src={recomm.entry?.images?.jpg?.large_image_url}
                      width={1200}
                      height={1200}
                      className="w-full h-full object-cover animation"
                      alt={recomm.entry?.title}
                    />
                    <span className="inset-0 absolute infoHover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                      <TbTriangleFilled
                        className="rotate-90"
                        size={36}
                        color="#ffffff"
                      />
                    </span>
                  </span>
                  <p className="w-full truncate text-ellipsis text-center">
                    {recomm.entry?.title || "N/A"}
                  </p>
                </Link>
              );
            })
          : data.slice(0, 3).map((recomm) => {
              return (
                <Link
                  href={`${recomm.entry?.mal_id}`}
                  key={recomm.entry?.mal_id}
                  className="flex items-start justify-start flex-col w-full gap-y-3"
                >
                  <Image
                    src={recomm.entry?.images?.jpg?.large_image_url}
                    width={200}
                    height={200}
                    className="h-[80%] aspect-[9/16] rounded-[0.6rem] object-cover object-top"
                    alt={recomm.entry?.title}
                  />
                  <p className="w-[12rem] truncate text-ellipsis text-center">
                    {recomm.entry?.title.length > 17
                      ? recomm.entry?.title.slice(0, 17) + "..."
                      : recomm.entry?.title}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Recom;
