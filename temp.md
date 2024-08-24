import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import AnimeSearch from "@/components/Search/AnimeSearch";
import HeaderRes from "./Header/HeaderRes";

const Header = () => {
  return (
    <>
    <header className="max-xl:hidden bg-white/50 dark:bg-gray-900/50 py-4 absolute w-screen padding overflow-x-hidden">
      <nav className="flex items-start xl:items-center justify-between gap-x-10 gap-y-4 max-xl:flex-col">
        <div className="text-xl font-bold flex items-center justify-between">
          <Link href="/">OTAKUTV</Link>
        </div>
        <span className="w-full md:w-[20%] xl:w-[30%]">
          <AnimeSearch />
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
          {/* <ModeToggle /> */}
        </ul>
      </nav>
    </header>
    <HeaderRes/>
    </>
  );
};

export default Header;
