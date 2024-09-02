import React from "react";
import AddComment from "./AddComment";
import ViewComment from "./ViewComment";
import Image from "next/image";

const Comment = ({ animeId }) => {
  return (
    <div className="w-full">
      <AddComment animeId={animeId} />
      <span className="flex items-end justify-between bg-[#272e41]/60 mt-10 w-screen xl:-ml-28 lg:-ml-10 md:-ml-12 -ml-6 md:px-12 lg:px-10 xl:px-28 pt-10 p-6">
        <Image
          src="/comment.png"
          width={1200}
          height={1200}
          alt="error"
          className="w-[18rem] h-[18rem] max-lg:hidden"
        />
        <ViewComment animeId={animeId} />
      </span>
    </div>
  );
};

export default Comment;
