"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddComment = ({ animeId, setAddCommentSpan }) => {
  const { isSignedIn, user } = useUser();
  const [comment, setComment] = useState("");
  const { data: comments, mutate } = useSWR(`/api/Comment?animeID=${animeId}`);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert("Please enter a comment!");
      return;
    }

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch("/api/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          userID: user.id,
          userName: user.firstName,
          animeID: animeId,
          hasImage: user.hasImage,
          imageUrl: user.imageUrl || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setComment("");
        mutate(); // This will trigger a re-fetch of the comments
        setAddCommentSpan(false); // Close the modal after submitting
      } else {
        const errorData = await res.json();
        console.log("Failed to post comment:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.log("Error occurred while posting comment:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-3">
        <Textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="Add your comment"
          className="h-[8rem] text-start placeholder:text-start"
        />
        <Button type="submit" className="bg-[#ff0000] hover:bg-[#ff0000]/60">Submit</Button>
      </form>
    </div>
  );
};

export default AddComment;
