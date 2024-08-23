"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

const AnimeSearch = ({className, iconColor}) => {
  const router = useRouter();
  const [search, setSearch] = useState(""); // State to hold the search term

  const handleSearchChange = (value) => {
    setSearch(value);
  };

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
        onSearchChange={handleSearchChange}
        searchwhat="anime"
        className={className}
        iconColor={iconColor}
      />
    </form>
  );
};

export default AnimeSearch;