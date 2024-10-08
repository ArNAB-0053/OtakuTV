import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SearchStyle from "./SearchStyle";

const SearchSuggestions = ({
  suggestions,
  search,
  widthpara = "max-sm:w-[67vw] w-[20rem] md:w-[35rem]",
  className = "absolute left-0 top-20 w-full bg-black border border-gray-300 rounded shadow-lg z-50",
}) => {
  const router = useRouter();
  const suggestionsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Handle click outside the suggestions to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsVisible(false); // Hide the suggestions list
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!suggestions || !search) return null;

  const handleViewAllClick = () => {
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
      setIsVisible(false); // Hide the suggestions list after navigating
    }
  };

  const handleSuggestionClick = (anime) => {
    // Navigate or perform action with selected anime
    router.push(`/anime/${anime.id}`); // Example route, adjust as needed
    setIsVisible(false); // Hide the suggestions list after selecting an option
  };

  if (!isVisible) return null; // Hide the component if `isVisible` is false

  return (
    <ul ref={suggestionsRef} className={className}>
      {suggestions.map((anime, index) => (
        <SearchStyle
          key={index}
          anime={anime}
          index={index}
          widthpara={widthpara}
          onClick={() => handleSuggestionClick(anime)} // Add click handler
        />
      ))}
      <Button
        className="w-full bg-[#ff0000] hover:bg-[#ff0000]/80 rounded-none"
        onClick={handleViewAllClick}
      >
        View All Results <span className="ml-2"><FaArrowRight /></span>
      </Button>
    </ul>
  );
};

export default SearchSuggestions;
