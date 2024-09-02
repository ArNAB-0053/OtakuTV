"use client";
import { useState } from "react";
import ViewComment from "./(components)/ViewComment";
import ToggleComments from "./(components)/ToggleComments";

const Comment = ({ animeId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleToggle = (event) => {
    setIsVisible(event.target.checked);
  };
  return (
    <div className="w-full">
      <span
        className={`flex ${isVisible ? "items-end h-[20rem] pt-10" : "items-center h-[4rem]" } justify-between bg-[#272e41]/70 mt-10 w-screen xl:-ml-28 lg:-ml-10 md:-ml-12 -ml-6 md:px-12 lg:px-10 xl:px-28 px-6 relative`}
      >
        {isVisible ? (
          <ViewComment
            animeId={animeId}
            isVisible={isVisible}
            handleToggle={handleToggle}
          />
        ) : (
          <span className="w-full flex items-center justify-center gap-x-3 font-bold">
            <p>Show Comments</p>
            <ToggleComments isChecked={isVisible} onChange={handleToggle} />
          </span>
        )}
      </span>
    </div>
  );
};

export default Comment;
