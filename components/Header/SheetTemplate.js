"use client";
import Link from "next/link";
import React from "react";
import { SheetHeader } from "../ui/sheet";

const SheetTemplate = ({link, title, setIsOpen}) => {

  return (
    <div className="w-full flex items-start justify-start flex-col gap-y-3">
      <SheetHeader
        className="flex items-start justify-center flex-col px-4 w-full hover:text-[#ff0000] font-semibold hover:font-bold"
        onClickClose={() => setIsOpen(false)}
      >
        <Link href={link}> {title} </Link>
      </SheetHeader>

      <div className="w-full h-[0.1px] bg-white/10"></div>
    </div>
  );
};

export default SheetTemplate;
