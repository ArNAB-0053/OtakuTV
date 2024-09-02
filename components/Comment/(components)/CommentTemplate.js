"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, FreeMode } from "swiper/modules";
import CommentTime from "./commentTime";
import { Button } from "../../ui/button";

const CommentTemplate = ({ data }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Pagination, Scrollbar]}
      className="mySwiperComment mb-2 select-none"
    >
      {data?.map((comment) => (
        <SwiperSlide
          key={comment._id}
          className="flex-shrink-0 swiperSlideComment"
        >
          <div className="bg-gradient-to-b from-[#3b466170] via-[#3b456250] to-transparent commentTem p-4 rounded w-full h-[13rem] flex-shrink-0 rounded-t-xl cursor-pointer flex items-start justify-start flex-col">
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
                <h2 className="text-md text-white/70 font-semibold uppercase">
                  {comment.userName}
                </h2>
                <p className="text-xs flex items-center justify-start gap-x-1 italic text-white/50">
                    - <CommentTime createdAt={comment.createdAt} />
                </p>
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

export default CommentTemplate;
