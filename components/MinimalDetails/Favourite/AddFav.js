import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { FaHeartCircleCheck, FaHeartCirclePlus } from "react-icons/fa6";
import useSWR, { mutate } from "swr";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const Fav = ({ animeID, imageUrl, animeName }) => {
  const router = useRouter()
  const { isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);
  const success = toast.success("Favorite added successfully.", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const errorToast = toast.error('🦄 Wow so easy!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });

  // Use SWR to fetch favorite status
  const { data: favoriteData, mutate: mutateFavorites } = useSWR(
    isSignedIn ? `/api/Fav?userID=${user?.id}&animeID=${animeID}` : null,
    fetcher
  );

  // Determine if the anime is already in favorites
  useEffect(() => {
    if (favoriteData) {
      setFavoriteAdded(favoriteData.exists);
    }
  }, [favoriteData]);

  const handleAddToFavorites = async () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    const data = {
      animeID,
      userID: user.id,
      userName: user.fullName,
      imageUrl,
      animeName,
    };

    try {
      const response = await fetch(`/api/Fav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFavoriteAdded(true);
        success
        mutateFavorites(); // Update SWR cache to reflect the new state
      } else {
        errorToast
        console.error("Error adding favorite:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      errorToast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <button
      onClick={handleAddToFavorites}
      className={`opacity-100 rounded-t-none rounded-b-md absolute -bottom-10 w-full flex items-center justify-center gap-x-3 font-semibold uppercase tracking-tighter py-3 text-white text-sm xl:text-md ${
        favoriteAdded
          ? "bg-green-800 hover:bg-green-900"
          : "bg-[#ff0000] hover:bg-red-600"
      }`}
      disabled={isSubmitting || favoriteAdded}
    >
      {!favoriteAdded ? (
        <>
          <FaHeartCirclePlus size={23} />
          <p>{isSubmitting ? "Adding..." : "Add to Favorites"}</p>
        </>
      ) : (
        <>
          <FaHeartCircleCheck size={23} />
          <p>Added to Favorites</p>
        </>
      )}
    </button>
    <ToastContainer />
    </>
  );
};

export default Fav;
