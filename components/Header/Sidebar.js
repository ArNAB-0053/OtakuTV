"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useState, useEffect } from "react";
import SheetTemplate from "./SheetTemplate";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";
import AnimeSearch from "../Search/AnimeSearch";
import Link from "next/link";
import Image from "next/image";

const MoreThings = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { search, suggestions, handleSearchChange, handleSuggestionClick } =
    useAnimeSearch();

  // Disable scrolling when the sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; // Ensure html also has no scroll
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = ""; // Reset html overflow
    }

    // Cleanup when component unmounts or the sheet closes
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Sheet
      className="w-full p-0 border-none"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger>
        <HiOutlineMenuAlt1 size={26} className=' Animation hover:text-[#ff0000]' />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-[999999] flex items-start justify-start gap-y-6 flex-col text-md uppercase font-semibold tracking-[-0.07rem] w-[17rem] px-0 glassmorphiem-morethings border-none bg-[#3e4350]/70 rounded-none overflow-x-hidden overflow-y-auto scroll-smooth scrollbar-none"
        viewCancelBtn={false}
      >
        <Link href="/" className="w-full font-bold text-xl flex items-center justify-center">
          <Image
            src="/logoo.svg"
            width={1200}
            height={1200}
            className="w-[9rem] h-[2rem] rounded-[0.6rem]"
            alt="Logo"
          />
        </Link>
        <span className="w-full bg-black/20 border border-none">
          <AnimeSearch search={search} onSearchChange={handleSearchChange} />
        </span>
        <SheetTemplate link="/Home" title="Home" setIsOpen={setIsOpen} />
        <SheetTemplate
          link="/Popular"
          title="most popular"
          setIsOpen={setIsOpen}
        />
        <SheetTemplate link="/Airing" title="On Going" setIsOpen={setIsOpen} />
        <SheetTemplate
          link="/Upcoming"
          title="upcoming"
          setIsOpen={setIsOpen}
        />
        <SheetTemplate link="/Recent" title="added" setIsOpen={setIsOpen} />
        <SheetTemplate link="/Genre" title="genre" setIsOpen={setIsOpen} />
        <SheetTemplate link="/Movies" title="Movies" setIsOpen={setIsOpen} />
        <SheetTemplate link="/TV" title="TV Series" setIsOpen={setIsOpen} />
        <SheetTemplate
          link={`/Favourite/${user?.id}`}
          title="favourite"
          setIsOpen={setIsOpen}
        />
        <SheetTemplate link="/FAQs" title="FAQs" setIsOpen={setIsOpen} />
        
      </SheetContent>
    </Sheet>
  );
};

export default MoreThings;
