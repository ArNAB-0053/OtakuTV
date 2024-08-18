"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
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

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaginationTemplate = ({ limit=12, url='/api/anime?' }) => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const { data, error } = useSWR(
    `${url}page=${page}&limit=${limit}`,
    fetcher
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const { data: animeList, pagination } = data;
  const totalPages = pagination?.last_visible_page || 1;

  return (
    <div className="flex items-center justify-center flex-col w-full padding">
      <div className="flex flex-wrap gap-8 items-start justify-between w-full">
        {animeList?.map((anime) => (
          <Link
            href={`anime/animedetails/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col"
          >
            <Image
              src={anime.images.jpg.image_url}
              width={200}
              height={200}
              className="w-40 h-60 md:w-44"
              alt={anime.title_english || anime.title}
            />
            <h1 className="mt-2 truncate w-36 text-center">
              {anime.title_english || anime.title}
            </h1>
          </Link>
        ))}
      </div>
      <Pagination className='my-10'>
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
