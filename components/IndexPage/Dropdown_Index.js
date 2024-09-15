import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Dropdown_Index = () => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-start justify-start gap-x-2 select-none outline-none border-none' >
          <HiOutlineMenuAlt1 size={26} />
          Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent value='left' className='bg-bgtop -left-9 absolute' >
          <DropdownMenuItem>
            <Link href="/Home" className="hover:text-[#ff0000]">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/Movies" className="hover:text-[#ff0000]">
              Movies
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/Popular" className="hover:text-[#ff0000]">
              Most Popular
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/Airing" className="hover:text-[#ff0000]">
              Top Airing
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown_Index;
