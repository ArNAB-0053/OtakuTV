"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
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

const Body = ({ page, handlePageChange, param }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(24);

  const getFullAnime = async () => {
    try {
      const res = await axios.get(`/api/anime?page=${page}&limit=${limit}`);
      const animeData = res.data.data;
      setData(animeData);
      setTotalPages(res.data.pagination.last_visible_page);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    getFullAnime();
  }, [page]);

  const handleItemClick = () => {
    alert("touched");
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-2 flex items-center justify-center flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-rows-auto">
        {data.map((anime) => (
          <Link
            href={`animedetails/${anime.mal_id}`}
            key={anime.mal_id}
            className="flex items-center justify-center flex-col m-4"
            // onClick={handleItemClick}
          >
            <Image
              src={anime.images.jpg.image_url}
              width={200}
              height={200}
              className="w-40 h-60 md:w-44"
              alt={anime.title_english || anime.title}
            />
            <h1 className="mt-2 truncate w-36 text-center">{anime.title_english || anime.title}</h1>
          </Link>
        ))}
      </div>
      <Pagination>
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
              return (
                <PaginationItem
                  className="cursor-pointer select-none"
                  key={pageNumber}
                >
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === page}
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

export default Body;
