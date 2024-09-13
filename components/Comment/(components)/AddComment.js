import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import AvatarSelectionForm from "./AvatarSelectionForm"; // Assuming the path is correct
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const AddComment = ({ animeId, setAddCommentSpan }) => {
  const { isSignedIn, user } = useUser();
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState(user?.firstName || "");
  const [selectedImage, setSelectedImage] = useState(user?.imageUrl || "");
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
          userName: userName || user.firstName,
          animeID: animeId,
          hasImage: true,
          imageUrl: selectedImage,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setComment("");
        mutate();
        setAddCommentSpan(false);
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
    <div className="w-full h-full p-6 bg-gradient-to-r from-[#000] to-[#1c1c1c] rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center max-md:flex-col gap-x-10 w-full h-full"
      >
        {/* Avatar Selection */}
        <div className="max-md:w-full w-[20rem] h-auto ">
          <h2 className="text-lg font-semibold mb-4 text-white/70 text-center">Select your Avatar</h2>
          <AvatarSelectionForm
            currentUserImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
        </div>

        {/* Form Section with Selected Image */}
        <div className="flex items-center justify-center flex-col gap-6 max-md:w-full w-[60%] bg-[#131313] p-6 rounded-lg shadow-lg">
          {/* Display Selected Image */}
          <div className="mb-4">
            <Image
              src={selectedImage || "/default-avatar.png"}
              alt="Selected avatar"
              width={1200}
              height={1200}
              className="rounded-full max-md:w-16 w-24 aspect-square shadow-lg ring-4 ring-[#ff0000]"
            />
          </div>

          {/* Username Input */}
          <Input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Enter your username (optional)"
            className="text-white bg-[#1c1c1c] border border-gray-600 p-2 rounded-md w-full"
          />

          {/* Comment Box */}
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
            placeholder="Add your comment"
            className="h-[8rem] text-white bg-[#1c1c1c] border border-gray-600 p-2 rounded-md w-full"
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#ff0000] hover:bg-[#ff0000]/80 text-white font-bold py-2 rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;