/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { React, useState, useEffect } from "react";
import { Button } from "../ui/button";
import Fetchstaff from "./Fetchstaff";
import SearchBar from "@/components/SearchBar";
import { useDeviceWidthContext } from "@/context/page";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data.data);

const Staff = ({ animeID }) => {
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const deviceWidth = useDeviceWidthContext();

  const { data, error } = useSWR(`https://api.jikan.moe/v4/anime/${animeID}/staff`, fetcher)
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

  if(error) return "An Error"
  if(!data) return "Loading..."

  return (
    <div className="flex items-start justify-start flex-col w-full mt-10">
      <h1 className="text-3xl font-bold mb-4 uppercase">Staff</h1>
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

        {data.length > 9 && (
          <Button onClick={handleOpenStaff}>View All</Button>
        )}

        {isViewingAll && (
          <div className="viewallstaff bg-background/25 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden flex items-center justify-center z-40">
            <div className="w-[90%] h-[80%] md:w-[80%] md:h-[80%] lg:w-[60%] lg:h-[60%] bg-bgitem flex flex-col items-start justify-center lg:p-8 p-4 rounded-md">
              <div className="flex items-start justify-between flex-col md:flex-row w-full mb-6 gap-y-3 relative">
                <h3 className="text-3xl font-bold">Staff</h3>
                <span className="w-[99%] md:w-[50%] border bg-transparent text-sm">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    searchwhat="staff"
                  />
                </span>
                <Button
                  className="bg-red-600 text-white hover:text-red-600 hover:bg-slate-200 absolute right-0 md:relative"
                  onClick={handleCloseStaff}
                >
                  <ImCross />
                </Button>
              </div>
              <span className="flex flex-wrap items-start justify-start gap-x-16 gap-y-6 w-full h-full overflow-auto">
                {filteredStaff?.length > 0 ? (
                  filteredStaff.map((staffff) => {
                    return (
                      <Fetchstaff
                        url={staffff.person?.url}
                        image_url={staffff?.person?.images?.jpg.image_url}
                        positions={getPos(staffff.positions)}
                        name={staffff.person?.name.replace(/,/g, "")}
                      />
                    );
                  })
                ) : (
                  <h1 className="text-center w-full text-muted">
                    No result found
                  </h1>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;
