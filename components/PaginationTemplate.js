"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import useSWR from "swr";
import { useDeviceWidthContext } from "@/context/page";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaginationTemplate = ({
  url = "/api/anime?",
  animeLink = "anime/animedetails",
}) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [limit, setLimit] = useState(6);
  const deviceWidth = useDeviceWidthContext();
  useEffect(() => {
    if (deviceWidth == "md") setLimit(14);
    else if (deviceWidth == "lg") setLimit(20);
    else if (deviceWidth == "sm") setLimit(10);
    else if (deviceWidth == "xl") setLimit(20);
    else setLimit(24);
  }, [deviceWidth]);

  // console.log(deviceWidth)

  const { data, error } = useSWR(`${url}page=${page}&limit=${limit}`, fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const { data: animeList, pagination } = data;
  const totalPages = pagination?.last_visible_page || 1;

  return (
    <div className="flex items-center justify-center flex-col padding w-screen">
      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-6 w-full h-full">
        {animeList?.map((anime) => (
          <Link
            href={`${animeLink}/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col mb-4"
          >
            <Image
              src={anime.images.jpg.image_url}
              width={1200}
              height={1200}
              className="w-full h-full  object-cover "
              alt={anime.title_english || anime.title}
            />

            <h1 className="mt-2 truncate w-36 text-center">
              {anime.title_english || anime.title}
            </h1>
          </Link>
        ))}
      </div>
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer select-none"
              onClick={() => handlePageChange(Math.max(1, Number(page) - 1))}
              disabled={page === 1}
            />
          </PaginationItem>
          {[...Array(Math.min(5, totalPages))].map((_, index) => {
            const pageNumber = Number(page) - 2 + index;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              const isActive = pageNumber === Number(page);
              return (
                <PaginationItem
                  className="cursor-pointer select-none"
                  key={pageNumber}
                >
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${isActive ? "bg-bgitem" : ""}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer select-none"
              onClick={() =>
                handlePageChange(Math.min(totalPages, Number(page) + 1))
              }
              disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationTemplate;
