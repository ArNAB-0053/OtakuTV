"use client";
import Image from "next/image";
import useSWR from "swr";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, FreeMode } from "swiper/modules";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CommentsList = ({ animeId }) => {
  const { data, error } = useSWR(`/api/Comment?animeID=${animeId}`, fetcher, {
    refreshInterval: 1000, // Poll every 1 second
  });

  if (error) return <div>Failed to load comments</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Swiper
      slidesPerView={3.8}
      slidesOffsetBefore={50}
      slidesOffsetAfter={140}
      freeMode={true}
      spaceBetween={120}
      pagination={{
        clickable: true,
      }}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Pagination, Scrollbar]}
      className="mySwiperComment"
    >
      {data.comments?.map((comment) => (
        <SwiperSlide key={comment._id} className="flex-shrink-0">
          <div className="bg-gradient-to-b from-[#2f384e] via-[#272e41] to-transparent p-4 rounded w-[17rem] h-[13rem] flex-shrink-0 rounded-t-xl cursor-pointer flex items-start justify-start flex-col">
            <div className="flex items-center justify-start gap-x-4">
              <span>
                {comment.hasImage ? (
                  <Image
                    src={comment.imageUrl}
                    height={1200}
                    width={1200}
                    alt="Profile Image"
                    className="w-[2.3rem] h-[2.3rem] rounded-full"
                  />
                ) : (
                  <Image
                    src="/errorImg.png"
                    width={1200}
                    height={1200}
                    alt="error"
                    className="w-[2.3rem] h-[2.3rem] rounded-full"
                  />
                )}
              </span>
              <div className="flex items-start justify-center flex-col">
                <h2 className="text-md text-white font-semibold uppercase">
                  {comment.userName}
                </h2>
                <p className="text-xs">- a minute ago</p>
              </div>
            </div>
            <p className="mt-4 text-wrap w-full truncate text-sm">
              {comment.comment}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommentsList;
