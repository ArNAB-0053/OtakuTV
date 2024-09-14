import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AddComment from "./AddComment";
import { GiCrossMark } from "react-icons/gi";

const AddCommentForm = ({ setAddCommentSpan, animeId }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation when the component mounts
    setIsVisible(true);
  }, []); // No need for clean-up here, we handle visibility in `handleClose`

  const handleClose = () => {
    // Trigger reverse slide-out animation
    setIsVisible(false);

    // Delay the actual removal of the component to let the animation play out
    setTimeout(() => {
      setAddCommentSpan(false); // Close the modal after the animation finishes
    }, 300); // Ensure this duration matches the CSS transition duration
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* Overlay background */}
      <div
        className="fixed inset-0 viewallstaff bg-background/50 z-[9994]"
        onClick={handleClose}
      ></div>
      <span
        className={`glassmorphiem-addcomment lg:w-[50rem] w-[90%] max-md:p-0 p-10 rounded-md relative z-[9996] modal-slide ${
          isVisible ? "modal-show" : "modal-hide"
        }`}
      >
        <AddComment animeId={animeId} setAddCommentSpan={setAddCommentSpan} />
        <Button
          className="absolute top-1 right-0 z-[9997] bg-transparent hover:bg-transparent"
          onClick={handleClose}
        >
          <GiCrossMark
            size={28}
            color="red"
            className="hover:brightness-75 brightness-100 animation"
          />
        </Button>
      </span>
    </div>
  );
};

export default AddCommentForm;
