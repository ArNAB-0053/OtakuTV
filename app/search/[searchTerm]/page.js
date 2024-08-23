// app/search/[searchTerm]/page.js
"use client";
import { useParams } from "next/navigation";
import PaginationTemplate from "@/components/PaginationCom/PaginationTemplate";

const SearchResultsPage = () => {
  const { searchTerm } = useParams();

  if (!searchTerm) {
    return <div>No search term provided</div>;
  }

  // Update the API URL to match the search query
  const decodedSearchTerm = decodeURIComponent(searchTerm);
  const searchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(decodedSearchTerm)}&`;

  return (
    <div className="w-full pt-12">
      <h1 className="text-xl mb-6 text-center">
        Search Results for <strong className="italic">{`"${decodedSearchTerm}"`}</strong>
      </h1>
      <PaginationTemplate url={searchUrl} animeLink="/anime/animedetails" />
    </div>
  );
};

export default SearchResultsPage;
