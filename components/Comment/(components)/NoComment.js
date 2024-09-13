"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddComment from "./AddComment";
import AddCommentForm from "./AddCommentForm";

const NoComment = ({
  setAddCommentSpan,
  addCommentSpan,
  animeId,
  handleAddCommentClick,
}) => {
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
        <AddCommentForm
          setAddCommentSpan={setAddCommentSpan}
          animeId={animeId}
        />
      )}
    </>
  );
};

export default NoComment;
