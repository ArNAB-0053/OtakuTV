import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import SearchSuggestions from "../Search/SearchSuggestions";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import AnimeSearch from "../Search/AnimeSearch";
import { usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/Popular", label: "Most Popular" },
  { href: "/Airing", label: "Airing" },
  { href: "/Upcoming", label: "Upcoming" },
  { href: "/Recent", label: "addad" },
];

const HeaderRes = () => {
  const pathname = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();
  const isHomePage = pathname === "/";

  const handleSearchClicked = () => {
    setIsClicked((prevState) => !prevState); // Toggle the state
  };
  return (
    <header className="xl:hidden flex items-center justify-center flex-col dark:bg-gray-900/50 z-10 ">
      <nav className="w-full flex items-center justify-start flex-col absolute left-0 top-0 dark:bg-gray-900/50 z-30 ">
        <ul className="flex items-center justify-between padding py-4 w-screen">
          <li className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <HiOutlineMenuAlt1 size={26} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer bg-background ml-5 mt-1">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      className={`cursor-pointer py-4 px-3 hover:bg-none  uppercase text-[0.8rem] ${
                        index % 2 === 0
                          ? "bg-[#212635] hover:bg-[#242a39]"
                          : "bg-bgitem hover:bg-[#252b3a]"
                      }`}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                    <div className=""></div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="text-xl font-bold flex items-center justify-between">
            <Link href="/">OTAKUTV</Link>
          </li>
          <span className="flex items-center justify-end gap-x-4">
            {!isHomePage && (
              <Button onClick={handleSearchClicked}>
                <IoIosSearch size={26} />
              </Button>
            )}
            <li>
              <CgProfile size={26} />
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
        )}{suggestions && search && (
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
