import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { FaHeartCircleCheck, FaHeartCirclePlus } from "react-icons/fa6";

const Fav = ({ animeID, imageUrl, animeName }) => {
  const { isSignedIn, user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  const handleAddToFavorites = async () => {
    if (!isSignedIn) {
      alert("You must be signed in to add to favorites.");
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
      const response = await fetch(`/api/Fav?userID=${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFavoriteAdded(true);
        alert("Favorite added successfully.");
        console.log("Favorite added:", result);
      } else {
        alert(`Error adding favorite: ${result.message}`);
        console.error("Error adding favorite:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to favorites. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) return <div>Not logged in</div>;

  return (
    <Button
      onClick={handleAddToFavorites}
      className={`btn-add-fav glassmorphiem-morethings rounded-t-none absolute bottom-0 w-full flex items-center justify-center gap-x-3 font-semibold uppercase tracking-tighter ${favoriteAdded ? 'bg-green-500/70 hover:bg-green-500/80' : 'bg-[#ff0000]/70 hover:bg-[#ff0000]/60'} `}
      disabled={isSubmitting || favoriteAdded}
    >
      {favoriteAdded ? (
        <>
          <FaHeartCircleCheck size={23} />
          <p>Added to Favorites</p>
        </>
      ) : (
        <>
          <FaHeartCirclePlus size={23} />
          <p>{isSubmitting ? "Adding..." : "Add to Favorites"}</p>
        </>
      )}
    </Button>
  );
};

export default Fav;
