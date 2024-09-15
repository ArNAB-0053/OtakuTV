"use client";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Image from "next/image";
import Link from "next/link";
import AnimeSearch from "../Search/AnimeSearch";
import Dropdown_Index from "./Dropdown_Index";

export default function Banner() {
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();
  return (
    <div className="absolute top-0 w-screen min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white   p-8 lg:p-16">
      <nav className="max-lg:hidden flex justify-center space-x-8 py-4 text-lg font-medium">
        <Link href="/Home" className="hover:text-[#ff0000]">
          Home
        </Link>
        <Link href="/Movies" className="hover:text-[#ff0000]">
          Movies
        </Link>
        <Link href="/TV" className="hover:text-[#ff0000]">
          TV Series
        </Link>
        <Link href="/Popular" className="hover:text-[#ff0000]">
          Most Popular
        </Link>
        <Link href="/Airing" className="hover:text-[#ff0000]">
          Top Airing
        </Link>
      </nav>
      <Dropdown_Index/>

      {/* Logo and Search Bar Section */}
      <section className="flex flex-col items-center mt-28">
        {/* Logo */}
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src="/logoo.svg" // Add your logo image here
            alt="AniWatch Logo"
            width={260}
            height={260}
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-1/2  flex items-center justify-start hover:ring-yellow-500">
          <AnimeSearch
            search={search}
            onSearchChange={handleSearchChange}
            className="rounded-full flex items-center justify-start bg-gray-700 text-lg focus:ring-2  py-3 px-8"
          />
        </div>

        {/* Top Search Links */}
        <div className="mt-4 text-sm text-gray-400">
          <span>Top search: </span>
          <span className="text-white">
            One Piece, My Hero Academia, Jujutsu Kaisen, Naruto, Attack on
            Titan, ...
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 flex flex-col items-center">
        <Link
          href="/Home"
          className="bg-[#ff0000] px-6 py-3 rounded-full text-lg font-bold hover:bg-[#ff0000]/80"
        >
          View Full Site
        </Link>
      </footer>
    </div>
  );
}
