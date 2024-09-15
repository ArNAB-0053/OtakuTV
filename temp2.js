"use client";
import useSWR from "swr";
import { Duration, rated } from "@/components/SimpleComponents";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useFetchAnime() {
  const { data, error } = useSWR(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1&limit=10",
    fetcher
  );

  return {
    animeData:
      data?.data?.map((anime) => ({
        mal_id: anime.mal_id,
        url: anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url,
        type: anime?.type,
        title: anime.title_english || anime.title,
        synopsis:
          anime.synopsis?.length > 250
            ? anime.synopsis.substring(0, 250) + "..."
            : anime.synopsis,
        rating: rated[anime.rating],
        score: anime.score,
        duration: Duration(anime.duration) ,
      })) || [],
    isLoading: !error && !data,
    isError: error,
  };
}
