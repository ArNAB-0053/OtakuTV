"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useDeviceWidthContext } from "@/context/page";
import SkeletonLoader from "./loading";
import { usePathname } from "next/navigation";
import HomeAnimes from "./(Home)/HomeAnimes";
import Animes from "./(components)/Animes";


const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaginationTemplate = ({
  url = "/api/anime?",
  animeLink = "anime/animedetails",
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [limit, setLimit] = useState(6);
  const deviceWidth = useDeviceWidthContext();
  useEffect(() => {
    if (!isHomePage) {
      if (deviceWidth == "md") setLimit(16);
      else if (deviceWidth == "lg") setLimit(20);
      else if (deviceWidth == "sm") setLimit(10);
      else if (deviceWidth == "xl") setLimit(20);
      else setLimit(21);
    } else {
      if (deviceWidth == "md") setLimit(10);
      else if (deviceWidth == "lg") setLimit(10);
      else if (deviceWidth == "sm") setLimit(8);
      else if (deviceWidth == "xl") setLimit(10);
      else setLimit(14);
    }
  }, [deviceWidth, isHomePage]);

  // console.log(deviceWidth)

  const { data, error, isLoading } = useSWR(
    `${url}page=${page}&limit=${limit}`,
    fetcher
  );

  if (error) return <SkeletonLoader limit={limit} />;
  if (isLoading) return <SkeletonLoader limit={limit} />;

  const { data: animeList, pagination } = data;
  const totalPages = pagination?.last_visible_page || 1;

  return (
    <>
      {isHomePage ? (
        <HomeAnimes
          animeLink={animeLink}
          animeList={animeList}
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
      ) : (
        <Animes
          animeLink={animeLink}
          animeList={animeList}
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default PaginationTemplate;
