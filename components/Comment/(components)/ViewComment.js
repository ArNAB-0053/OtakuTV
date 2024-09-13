"use client";
import useSWR from "swr";
import Loading from "./loading";
import CommentTemplate from "./CommentTemplate";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddComment from "./AddComment";
import { useState, useEffect } from "react";
import ToggleComments from "./ToggleComments";
import Error from "./error";
import NoComment from "./NoComment";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


const fetcher = (url) => fetch(url).then((res) => res.json());

const ViewComment = ({ animeId, isVisible, handleToggle }) => {
  const { isSignedIn } = useUser();
  const router = useRouter()
  const [addCommentSpan, setAddCommentSpan] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/api/Comment?animeID=${animeId}`,
    fetcher,
    {
      refreshInterval: 1000, // Poll every 1 second
    }
  );

  const sortedComments = data?.comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  useEffect(() => {
    if (addCommentSpan) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Ensure html also has no scroll
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = ""; // Reset html overflow
    }
  }, [addCommentSpan]);

  const handleAddCommentClick = () => {
    if (isSignedIn) {
      setAddCommentSpan(true);
    } else {
      router.push('/sign-in'); // Redirect to sign-in page
    }
  };

  if (error) return <Error />;
  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loading />
      </div>
    );

  if (sortedComments.length == 0)
    return (
      <NoComment
        setAddCommentSpan={setAddCommentSpan}
        animeId={animeId}
        addCommentSpan={addCommentSpan}
        handleAddCommentClick={handleAddCommentClick}
      />
    );

  return (
    <>
      <Image
        src="/comment.png"
        width={1200}
        height={1200}
        alt="error"
        className="w-[18rem] h-[18rem] max-lg:hidden"
      />
      <span className="overflow-hidden flex items-center justify-between flex-col w-full">
        <span className="flex items-center justify-between w-full mb-4">
          <Button
            onClick={handleAddCommentClick}
            className="bg-[#ff0000]/80 hover:bg-[#ff0000]/50"
          >
            Add comment
          </Button>
          <span className="flex items-center justify-end gap-x-3 mr-2 font-bold">
            <p className="max-lg:hidden">Show Comments</p>
            <ToggleComments isChecked={isVisible} onChange={handleToggle} />
          </span>
        </span>
        <CommentTemplate data={sortedComments} />
      </span>

      {addCommentSpan && (
        <div className="fixed inset-0 z-[9998]  flex items-center justify-center">
          <div
            className="fixed inset-0 viewallstaff bg-background/50 z-[9994]"
            onClick={() => setAddCommentSpan(false)}
          ></div>
          <span className="glassmorphiem-morethings bg-black/50 lg:w-[50rem] w-full p-10 rounded-md relative z-[9996]">
            <AddComment
              animeId={animeId}
              setAddCommentSpan={setAddCommentSpan} // Pass the state setter function
            />
          </span>
        </div>
      )}
    </>
  );
};

export default ViewComment;
