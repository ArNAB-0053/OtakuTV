'use client'
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export const useAnimeSearch = () => {
  const [search, setSearch] = useState(""); // Search term state
  const [debouncedSearch, setDebouncedSearch] = useState(search); // Debounced search term

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetching suggestions using SWR
  const { data: suggestions, error } = useSWR(
    debouncedSearch
      ? `https://api.jikan.moe/v4/anime?q=${debouncedSearch}&limit=5`
      : null,
    fetcher
  );

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleSuggestionClick = (title) => {
    setSearch(title);
  };

  return {
    search,
    suggestions,
    handleSearchChange,
    handleSuggestionClick,
    error,
  };
};
