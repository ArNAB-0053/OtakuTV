'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import useSWR from 'swr';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddComment = () => {
  const { isSignedIn, user } = useUser();
  const [comment, setComment] = useState("");
  const { mutate } = useSWR('/api/Comment');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!comment) {
      alert("Please enter a comment!");
      return;
    }

    if(!isSignedIn) {
      router.push('/sign-in');
      return;
    }
  
    try {
      const res = await fetch("/api/Comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, userID: user.id, userName: user.firstName }),
      });
  
      if (res.ok) {
        setComment("");
        mutate();  // This will trigger a re-fetch of the comments
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
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="Add your comment"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddComment;