/* eslint-disable react/jsx-key */
"use client";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { React, useState, useEffect } from "react";
import { Button } from "../ui/button";
import Fetchstaff from "./Fetchstaff";
import SearchBar from "@/components/SearchBar";

const Staff = ({ staff, animeID }) => {
  const [stafff, setStaff] = useState([]);
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const getStaff = async (animeID) => {
    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeID}/staff`
      );
      const data = res.data.data;
      // console.log(data)
      setStaff(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStaff(animeID);
  }, []);

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
  const filteredStaff = stafff?.filter((staffff) => {
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

  return (
    <div className="flex items-start justify-start flex-col w-full">
      <h1>Staff</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 place-items-start gap-x-16 gap-y-6">
        {stafff?.length > 0 &&
          stafff.slice(0, 6).map((staffff) => {
            return (
              <Fetchstaff
                url={staffff.person?.url}
                image_url={staffff?.person?.images?.jpg.image_url}
                positions={staffff.positions}
                name={staffff.person?.name}
              />
            );
          })}

        {stafff.length > 9 && (
          <Button onClick={handleOpenStaff}>
            {isViewingAll ? "Show Less" : "View All"}
          </Button>
        )}

        {isViewingAll && (
          <div className="viewallstaff bg-background/25 fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen overflow-hidden flex items-center justify-center">
            <div className="w-[90%] h-[80%] md:w-[80%] md:h-[80%] lg:w-[60%] lg:h-[60%] bg-bgitem flex flex-col items-start justify-center p-4 rounded-md">
              <div className="flex items-center justify-between w-full mb-4">
                <h3 className="text-3xl">Staff</h3>
                <span className="w-[40%] border bg-transparent text-sm">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    searchwhat="staff"
                  />
                </span>
                <Button
                  className="bg-red-600 text-white hover:text-red-600"
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
                        positions={staffff.positions}
                        name={staffff.person?.name}
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
