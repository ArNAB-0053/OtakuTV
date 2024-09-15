import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteFav = ({ userID, animeID, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/Fav", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, animeID }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Favorite removed successfully.", {
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
        onDelete({ animeID, success: true });
        router.refresh();
      } else {
        toast.error("Error removing favorite: " + result.message, {
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
        onDelete({ animeID, success: false, error: result.message });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: " + error.message, {
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
      onDelete({ animeID, success: false, error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button" // Ensure it doesn't act as a submit button
        onClick={handleDelete}
        className="bg-[#ff0000] text-white rounded-full p-2 hover:bg-red-700 transition-colors duration-300"
        disabled={isSubmitting}
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
};

export default DeleteFav;
