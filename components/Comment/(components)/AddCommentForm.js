import { Button } from "@/components/ui/button";
import AddComment from "./AddComment";
import { GiCrossMark } from "react-icons/gi";

const AddCommentForm = ({ setAddCommentSpan, animeId }) => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* Overlay background */}
      <div
        className="fixed inset-0 viewallstaff bg-background/50 z-[9994]"
        onClick={() => setAddCommentSpan(false)}
      ></div>

      {/* Modal content */}
      <span className="glassmorphiem-morethings bg-black/50 lg:w-[50rem] w-[90%] max-md:p-0 p-10 rounded-md relative z-[9996]">
        {/* AddComment component */}
        <AddComment
          animeId={animeId}
          setAddCommentSpan={setAddCommentSpan}
        />
        
        {/* Close button */}
        <Button
          className="absolute top-1 right-0 z-[9997] bg-transparent hover:bg-transparent"
          onClick={() => setAddCommentSpan(false)}
        >
          <GiCrossMark size={28} color="red" className="hover:brightness-75 brightness-100 animation" />
        </Button>
      </span>
    </div>
  );
};

export default AddCommentForm;
