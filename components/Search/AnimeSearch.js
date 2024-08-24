"use client";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

const AnimeSearch = ({ search, onSearchChange, className, iconColor }) => {
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="w-full">
      <SearchBar
        searchTerm={search}
        onSearchChange={onSearchChange}
        searchwhat="anime"
        className={className}
        iconColor={iconColor}
      />
    </form>
  );
};

export default AnimeSearch;
