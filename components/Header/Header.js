"use client";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import Link from "next/link";
import AnimeSearch from "@/components/Search/AnimeSearch";
import HeaderRes from "./HeaderRes";
import SearchSuggestions from "../Search/SearchSuggestions";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import MoreThings from "./MoreThings";

const Header = () => {
  const pathname = usePathname();
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();
  const isHomePage = pathname === "/";
  const { user } = useUser();
  return (
    <>
      <header className="max-xl:hidden bg-white/50 dark:bg-gray-900/50 py-4 absolute w-screen padding overflow-x-hidden z-[9999]">
        <nav className="flex items-start xl:items-center justify-between gap-x-10 gap-y-4 max-xl:flex-col">
          
          <MoreThings user={user}/>
          <div className="w-[42rem] flex items-center justify-start">
            <Link href="/" className="w-[15rem] font-bold text-xl ">
              OTAKUTV
            </Link>
            {!isHomePage && (
              <span className="w-[25rem] bg-black/20 border border-[#47567c5c]">
                <AnimeSearch
                  search={search}
                  onSearchChange={handleSearchChange}
                />
              </span>
            )}
          </div>

          <ul className="max-xl:hidden flex w-auto items-center justify-evenly gap-x-7 uppercase font-medium">
            <li>
              <Link href="/Airing"> On Going </Link>
            </li>
            <li>
              <Link href="/Upcoming"> Upcoming </Link>
            </li>
            <li>
              <Link href="/Recent"> Added </Link>
            </li>
            <li>
              <Link href={`/Favourite/${user?.id}`}> Favourite </Link>
            </li>
            <li>
              <SignedOut>
                <SignInButton className="uppercase bg-bgitem px-4 py-2 rounded-sm text-sm" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </nav>
      </header>
      <HeaderRes />
      {suggestions && search && (
        <SearchSuggestions
          suggestions={suggestions}
          search={search}
          onSuggestionClick={handleSuggestionClick}
          className="absolute top-16 z-30 bg-bgitem w-[25rem] left-[22rem]"
          widthpara="w-[14rem] md:w-[16rem]"
        />
      )}
    </>
  );
};

export default Header;
