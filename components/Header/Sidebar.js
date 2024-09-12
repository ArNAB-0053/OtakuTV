"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useState } from "react/";
import SheetTemplate from "./SheetTemplate";

const MoreThings = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet className="w-full p-0" open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <HiOutlineMenuAlt1 size={26} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" z-[999999] flex items-start justify-start gap-y-6 flex-col text-md uppercase font-semibold tracking-[-0.07rem] w-[17rem] px-0 glassmorphiem-morethings bg-[#3e4350]/70 rounded-none"
        viewCancelBtn={false}
      >
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
        <SheetTemplate
          link={`/Favourite/${user?.id}`}
          title="favourite"
          setIsOpen={setIsOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MoreThings;
