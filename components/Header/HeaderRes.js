import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const menuItems = [
  { href: "/Popular", label: "Most Popular" },
  { href: "/Airing", label: "Airing" },
  { href: "/Upcoming", label: "Upcoming" },
  { href: "/Recent", label: "addad" },
];

const HeaderRes = () => {
  return (
    <header className="xl:hidden">
      <nav className="">
        <ul className="flex items-center justify-between padding absolute w-screen bg-white dark:bg-gray-900/50 z-10">
          <li className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <HiOutlineMenuAlt1 size={26} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                allign="start"
                className="ml-5 mt-2 cursor-pointer bg-background z-50"
              >
                {menuItems.map((item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      className={`cursor-pointer py-4 px-3 hover:bg-none  uppercase text-[0.8rem] ${
                        index % 2 === 0 ? "bg-[#212635] hover:bg-[#242a39]" : "bg-bgitem hover:bg-[#252b3a]"
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
          <li>
            <CgProfile size={26} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderRes;
