"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useFetchAnime } from "./FetchImage";
import Image from "next/image";
import { useDeviceWidthContext } from "@/context/page";
import { useState, useEffect } from "react";
import AnimeSearch from "@/components/Search/AnimeSearch";
import Link from "next/link";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import SearchSuggestions from "@/components/Search/SearchSuggestions";

const HomeBox = () => {
  const { animeData, isLoading, isError } = useFetchAnime();
  const [limit, setLimit] = useState(6);
  const deviceWidth = useDeviceWidthContext();

  // Use the search hook
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();

  useEffect(() => {
    if (deviceWidth == "md") setLimit(3);
    else if (deviceWidth == "lg") setLimit(3);
    else if (deviceWidth == "sm") setLimit(2);
    else if (deviceWidth == "xl") setLimit(4);
    else setLimit(4);
  }, [deviceWidth]);

  return (
    <div className="padding w-screen relative ">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={limit}
        loop={true}
        navigation={false}
        pagination={true}
        spaceBetween={10}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        coverflowEffect={{
          rotate: 0, // Angle change
          stretch: 20,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {animeData?.map((anime, index) => (
          <SwiperSlide key={index}>
            <Link
              href={`anime/animedetails/${anime?.mal_id}`}
              className="w-full flex gap-4 items-center justify-start mb-4 bg-bgtop"
            >
              <div className="brightness-70 grayscale hover:grayscale-0 transition-all ease-in aspect-[3/4]">
                <Image
                  src={anime.url}
                  width={2400}
                  height={2400}
                  className="h-[24rem] xl:h-[32rem] aspect-[3/4] object-cover"
                  alt={anime.title_english || anime.title}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
        {/* AnimeSearch component with custom search functionality */}
        <AnimeSearch
          search={search}
          onSearchChange={handleSearchChange}
          className="flex w-full md:w-[42rem] items-center justify-start absolute z-40 bottom-4 left-1/2 transform -translate-x-1/2 py-5 px-10 bg-white border-black border animeSearch text-black"
          iconColor="#000000"
        />
      </Swiper>

      {/* Render SearchSuggestions */}
        {suggestions && search && (
          <SearchSuggestions
            suggestions={suggestions}
            search={search}
            onSuggestionClick={handleSuggestionClick}
            className="absolute top-[94%] left-1/2 transform -translate-x-1/2 border bg-bgitem rounded shadow-lg z-50 w-[90%] md:w-[42rem] overflow-hidden "
            handleFormSubmit={handleSearchChange}
          />
        )}
    </div>
  );
};

export default HomeBox;
