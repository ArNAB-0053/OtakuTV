"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchStyle from "./SearchStyle";

const SearchSuggestions = ({
  suggestions,
  search,
  onSuggestionClick,
  className = "absolute left-0 top-20 w-full bg-black border border-gray-300 rounded shadow-lg z-50",
}) => {
  if (!suggestions || !search) return null;

  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
    }
  };

  const handleViewAllClick = () => {
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
    }
  };

  return (
    <ul className={className}>
      {suggestions.map((anime, index) => (
        <SearchStyle anime={anime} index={index} />
      ))}
      <Button className="w-full bg-[#ff0000] rounded-none mt-2" onClick={handleViewAllClick}>
        View All
      </Button>
    </ul>
  );
};

export default SearchSuggestions;
