"use client";
import Link from "next/link";
import React from "react";
import { SheetHeader } from "../ui/sheet";

const SheetTemplate = ({link, title, setIsOpen}) => {

  return (
    <>
      <SheetHeader
        className="flex items-start justify-center flex-col px-4 w-full"
        onClickClose={() => setIsOpen(false)}
      >
        <Link href={link}> {title} </Link>
      </SheetHeader>

      <div className="w-full h-[0.1px] bg-white/10"></div>
    </>
  );
};

export default SheetTemplate;
