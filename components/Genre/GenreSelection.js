"use client";
import React, { useState, useEffect } from "react";
import genres from "@/JSON/genres.json";
import { Button } from "../ui/button";

const GenreSelection = ({ onGenreChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenreVisible, setIsGenreVisible] = useState(true); // For All/Hide Genre
  const [isSearching, setIsSearching] = useState(false); // To manage search state

  const handleGenreChange = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genre) => genre !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    onGenreChange(selectedGenres);
  }, [selectedGenres, onGenreChange]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.length > 0);
  };

  const toggleGenreVisibility = () => {
    setIsGenreVisible((prev) => !prev);
  };

  // Filter genres based on the search term
  const filteredGenres = genres.filter((genre) => {
    const matchesSearch = genre.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isSelected = selectedGenres.includes(genre.id);

    if (isSearching) {
      // During search, always show matching genres
      return matchesSearch;
    }

    // Not searching, show genres based on All/Hide Genre state
    return isGenreVisible || isSelected;
  });

  return (
    <div className="flex flex-col gap-2 padding">
      <span className="flex items-start justify-start gap-x-6 gap-y-1 max-lg:flex-col">
        <input
          type="text"
          placeholder="Search genres..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-2 px-3 py-2 text-sm border rounded w-full lg:w-[40vw] appearance-none outline-none bg-bgitem placeholder:text-white/50"
        />
        <Button
          onClick={toggleGenreVisibility}
          disabled={isSearching}
          className="text-white/50 hover:text-white/70"
        >
          {isGenreVisible ? "Hide Genre" : "All Genre"}
        </Button>
      </span>

      <div className="flex flex-wrap gap-2 mt-6">
        {filteredGenres
          .sort((a, b) => (selectedGenres.includes(a.id) ? -1 : 1)) // Show selected genres first
          .map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(genre.id)}
              className={`px-3 py-1 text-sm font-medium transition-colors rounded-full ${
                selectedGenres.includes(genre.id)
                  ? "bg-[#ff0000] text-white"
                  : "bg-bgitem hover:bg-bgtop text-white/50"
              }`}
            >
              {genre.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default GenreSelection;
