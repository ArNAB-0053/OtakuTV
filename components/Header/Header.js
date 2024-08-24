"use client";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Link from "next/link";
import AnimeSearch from "@/components/Search/AnimeSearch";
import HeaderRes from "./HeaderRes";
import SearchSuggestions from "../Search/SearchSuggestions";

const Header = () => {
  const { search, suggestions, handleSearchChange, handleSuggestionClick } = useAnimeSearch();

  return (
    <>
      <header className="max-xl:hidden bg-white/50 dark:bg-gray-900/50 py-4 absolute w-screen padding overflow-x-hidden">
        <nav className="flex items-start xl:items-center justify-between gap-x-10 gap-y-4 max-xl:flex-col">
          <div className="text-xl font-bold flex items-center justify-between">
            <Link href="/">OTAKUTV</Link>
          </div>
          <span className="w-full md:w-[25rem] bg-black/20 border border-[#47567c5c]">
            <AnimeSearch search={search} onSearchChange={handleSearchChange} />
          </span>
          <ul className="max-xl:hidden flex w-auto items-center justify-evenly gap-x-7 uppercase font-medium">
            <li>
              <Link href="/Popular"> Most Popular </Link>
            </li>
            <li>
              <Link href="/Airing"> On Going </Link>
            </li>
            <li>
              <Link href="/Upcoming"> Upcoming </Link>
            </li>
            <li>
              <Link href="/Recent"> Added </Link>
            </li>
          </ul>
        </nav>
      </header>
      <HeaderRes />

      {/* Render the suggestions component */}
      {suggestions && search && (
        <SearchSuggestions
          suggestions={suggestions}
          search={search}
          onSuggestionClick={handleSuggestionClick}
          className="absolute top-16 z-30 bg-bgitem w-[25rem] left-[25.3%]"
        />
      )}
    </>
  );
};

export default Header;
