"use client";
import Body from "@/components/Body";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const Page = ({ params }) => {
  const router = useRouter();
  const [pages, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`${newPage}`);
  };
  return <Body page={params.pageId} handlePageChange={handlePageChange} />;
};

export default Page;
