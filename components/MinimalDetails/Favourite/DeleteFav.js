import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteFav = ({ userID, animeID, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/Fav', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, animeID }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Favorite removed successfully.', {
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
        onDelete(); // Trigger the callback to refresh the list
      } else {
        toast.error('Error removing favorite: ' + result.message, {
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
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error: ' + error.message, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-[#ff0000] text-white rounded-full p-2 hover:bg-red-700 transition-colors duration-300"
      disabled={isSubmitting}
    >
      <FaTimes size={16} />
    </button>
  );
};

export default DeleteFav;
