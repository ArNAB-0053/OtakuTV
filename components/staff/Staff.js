/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { React, useState, useEffect } from "react";
import Fetchstaff from "./(components)/Fetchstaff";
import { useDeviceWidthContext } from "@/context/page";
import useSWR from "swr";
import SkeletonLoader from "./(components)/loading";
import ViewAll from "./(components)/ViewAll";
import { Button } from "@/components/ui/button";
import Error from "./(components)/error";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const Staff = ({ animeID }) => {
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const deviceWidth = useDeviceWidthContext();

  const { data, isLoading, error } = useSWR(
    `https://api.jikan.moe/v4/anime/${animeID}/staff`,
    fetcher
  );
  // Handle the btn clicked or not to open all staff or close it
  const handleOpenStaff = () => {
    setIsViewingAll(true);
  };

  const handleCloseStaff = () => {
    setIsViewingAll(false);
  };

  // SearchBar
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Filter staff based on the search term
  const filteredStaff = data?.filter((staffff) => {
    const searchLower = searchTerm
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^\w]/g, "");

    // normalize and concatenate names by removing spaces and special characters
    const normalizeAndConcatenate = (name) =>
      name.replace(/\s+/g, "").replace(/[^\w]/g, "").toLowerCase();

    // Normalize name and positions
    const normalizedName = staffff.person?.name
      ? normalizeAndConcatenate(staffff.person.name)
      : "";

    const normalizedPositions = Array.isArray(staffff.positions)
      ? normalizeAndConcatenate(staffff.positions.join(""))
      : "";

    // Check both possible concatenated orders for the name -> 1.Iijima Kouji 2.Kouji Iijima
    const nameParts = staffff.person?.name
      ? staffff.person.name.split(",").map((part) => part.trim())
      : [];
    const concatenatedName1 = nameParts.join("").toLowerCase();
    const concatenatedName2 = nameParts.reverse().join("").toLowerCase();

    return (
      concatenatedName1.includes(searchLower) ||
      concatenatedName2.includes(searchLower) ||
      normalizedName.includes(searchLower) ||
      normalizedPositions.includes(searchLower)
    );
  });

  const getPos = (pos) => {
    const poss = pos.join(", ");
    return poss.length > 33 ? poss.slice(0, 33) + "..." : poss;
  };

  // console.log(deviceWidth)
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    if (deviceWidth == "md") setLimit(9);
    else if (deviceWidth == "lg") setLimit(9);
    else if (deviceWidth == "sm") setLimit(6);
    else if (deviceWidth == "xl") setLimit(8);
    else setLimit(6);
  }, [deviceWidth]);

  if (error) return <Error />;
  if (isLoading) return <SkeletonLoader limit={limit} />;

  return (
    <div className="flex flex-col items-start justify-start gap-x-16 gap-y-6 w-full">
      <div className="grid grid-cols-2 grid-rows-auto sm:max-lg:grid-cols-3 lg:max-xl:grid-cols-4 xl:grid-cols-3 place-items-start gap-x-4 w-full">
        {data?.length > 0 &&
          data.slice(0, limit).map((staffff) => {
            return (
              <Fetchstaff
                url={staffff.person?.url}
                image_url={staffff?.person?.images?.jpg.image_url}
                positions={getPos(staffff.positions)}
                name={staffff.person?.name.replace(/,/g, "")}
                width="w-full"
              />
            );
          })}
      </div>

      <ViewAll
        isViewingAll={isViewingAll}
        handleCloseStaff={handleCloseStaff}
        handleSearchChange={handleSearchChange}
        filteredStaff={filteredStaff}
        getPos={getPos}
      />

      {data?.length > 9 && <Button onClick={handleOpenStaff}>View All</Button>}
    </div>
  );
};

export default Staff;
