import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import SearchBar from "./SearchBar";
import AnimeSearch from "./AnimeSearch";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900/50 py-4 absolute w-screen px-6 md:px-12 lg:px-10 xl:px-28">
      <nav className="flex items-center justify-between gap-10">
        <div className="text-xl font-bold">
          <Link href="/">OTAKUTV</Link>
        </div>
        <AnimeSearch/>
        <ul className="flex w-auto items-center justify-evenly gap-x-7 uppercase font-medium">
          <li>
            <Link href="/Popular"> Most Popular </Link>{" "}
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
          <ModeToggle />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
