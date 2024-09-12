"use client"
import { useState } from "react";
import PaginationTemplate from "@/components/PaginationCom/PaginationTemplate";
import GenreSelection from "@/components/Genre/GenreSelection";


const Page = () => {
  const [genres, setGenres] = useState([]);

  const handleGenreChange = (selectedGenres) => {
    setGenres(selectedGenres);
  };

  const genreQuery = genres.length > 0 ? genres.join(",") : "1"; // Fallback to genre id 1 if no genre selected

  return (
    <div className="pt-6">
      <GenreSelection onGenreChange={handleGenreChange} />
      <PaginationTemplate url={`https://api.jikan.moe/v4/anime?genres=${genreQuery}&`} extraParams="&order_by=popularity" />
    </div>
  );
};

export default Page;


