import Link from "next/link";
import SearchSuggestions from "../Search/SearchSuggestions";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import AnimeSearch from "../Search/AnimeSearch";
import { usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import MoreThings from "./Sidebar";

const HeaderRes = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();
  const isHomePage = pathname === "/Home";
  const isIndexPage = pathname === "/";

  const handleSearchClicked = () => {
    setIsClicked((prevState) => !prevState); // Toggle the state
  };

  return (
    <header className={`${isIndexPage ? 'hidden bg-transparent' : 'xl:hidden dark:bg-gray-900/50'} flex items-center justify-center flex-col  z-10 `}>
      <nav className="w-full flex items-center justify-start flex-col absolute left-0 top-0 dark:bg-gray-900/50 z-[9999] ">
        <ul className="flex items-center justify-between padding py-4 w-screen">
          <MoreThings user={user} />
          <li className="text-xl font-bold flex items-center justify-between">
            <Link href="/" className="w-[9rem] font-bold text-xl ">
              <Image
                src="/logoo.svg"
                width={1200}
                height={1200}
                className="w-[9rem] h-[2rem] rounded-[0.6rem]"
                alt="Logo"
              />
            </Link>
          </li>
          <span className="flex items-center justify-end gap-x-4">
            {!isHomePage && (
              <Button onClick={handleSearchClicked}>
                <IoIosSearch size={26} />
              </Button>
            )}
            <li>
              <SignedOut>
                <SignInButton className="uppercase bg-bgitem px-4 py-2 rounded-sm text-sm" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </span>
        </ul>
        {!isHomePage && isClicked && (
          <span className="w-full bg-black/20 border border-[#47567c5c] px-4">
            <AnimeSearch
              search={search}
              onSearchChange={handleSearchChange}
              className="w-full flex items-center justify-start gap-x-3 py-3 px-2"
            />
          </span>
        )}
        {suggestions && search && (
          <SearchSuggestions
            suggestions={suggestions}
            search={search}
            onSuggestionClick={handleSuggestionClick}
            className="z-30 bg-bgitem w-full xl:w-[25rem] ml-0"
            widthpara="w-full xl:w-[16rem]"
          />
        )}
      </nav>
    </header>
  );
};

export default HeaderRes;
