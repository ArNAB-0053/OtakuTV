"use client";
import Image from "next/image";
import useSWR from "swr";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, FreeMode } from "swiper/modules";
import { createRef } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CommentsList = ({ animeId }) => {
  const { data, error } = useSWR(`/api/Comment?animeID=${animeId}`, fetcher, {
    refreshInterval: 1000, // Poll every 1 second
  });

  const containerRef = createRef();

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newScrollLeft = scrollLeft + (startX - e.clientX);
      containerRef.current.scrollLeft = newScrollLeft;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleWheel = (e) => {
    const container = containerRef.current;
    const delta = e.deltaY;
    const scrollLeft = container.scrollLeft;

    container.scrollLeft = scrollLeft - delta;
  };

  if (error) return <div>Failed to load comments</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div
      className="flex items-start justify-start overflow-y-hidden overflow-x-auto gap-x-10 w-full commentScrollbar scroll-smooth "
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {data.comments?.map((comment) => (
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
      ))}
    </div>
  );
};

export default CommentsList;
