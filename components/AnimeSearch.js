"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

const AnimeSearch = () => {
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
    <form onSubmit={handleSearchSubmit}>
      <SearchBar
        searchTerm={search}
        onSearchChange={handleSearchChange}
        searchwhat="anime"
      />
    </form>
  );
};

export default AnimeSearch;