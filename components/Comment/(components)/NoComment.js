"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddComment from "./AddComment";

const NoComment = ({ setAddCommentSpan, addCommentSpan, animeId, handleAddCommentClick }) => {
  return (
    <>
      <div className="w-full h-[20rem] flex items-center justify-between max-xl:justify-center max-xl:flex-col">
        <Image
          src="/noCommentBocchi.gif"
          width={1200}
          height={1200}
          alt="error"
          className="w-[14rem] h-[14rem] max-xl:w-[9rem] max-xl:h-[9rem] rounded-full"
        />
        <span className="text-sm lg:text-2xl text-center ">
          <p>No comments yet.</p>
          <p>Be the first to share your thoughts!</p>
          <Button
            onClick={handleAddCommentClick}
            className="bg-[#ff0000]/80 hover:bg-[#ff0000]/50 mt-4"
          >
            Add comment
          </Button>
        </span>
        <Image
          src="/noCommentGin.gif"
          width={1200}
          height={1200}
          alt="error"
          className="w-[14rem] h-[14rem] rounded-full scale-105 max-xl:hidden"
        />
      </div>
      {addCommentSpan && (
        <>
          <div
            className="fixed inset-0 viewallstaff bg-background/25 z-[9998]"
            onClick={() => setAddCommentSpan(false)}
          ></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background lg:w-[30rem] w-[90%] h-[15rem] p-10 z-[9999] rounded-md">
            <AddComment
              animeId={animeId}
              setAddCommentSpan={setAddCommentSpan} // Pass the state setter function
            />
          </span>
        </>
      )}
    </>
  );
};

export default NoComment;
