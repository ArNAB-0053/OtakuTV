import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const Star_rating = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    // debugger;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar size={30}  color='#505050' className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt size={30} color='#505050' className="icon" />
        ) : (
          <FaRegStar size={30} color='#505050' className="icon" />
        )}
      </span>
    );
  });

  return (
    <div>
      <div className="flex items-center justify-center gap-1">
        {ratingStar}
      </div>
    </div>
  );
};

export default Star_rating;