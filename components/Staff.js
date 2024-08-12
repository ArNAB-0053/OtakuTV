"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { React, useState, useEffect } from "react";

const Staff = ({ staff, animeID }) => {
  const [stafff, setStaff] = useState({});
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
  return (
    <div className='flex items-start justify-start flex-col w-full'>
      <h1>Staff</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 place-items-start gap-x-16 gap-y-6">
        {stafff?.length > 0 &&
          stafff.map((staffff) => {
            return (
              <Link href={staffff.person?.url} className="mr-2 mb-2 flex items-center gap-x-3 justify-start">
                <Image
                  src={staffff?.person?.images?.jpg.image_url}
                  width={1200}
                  height={1200}
                  className="w-[4.5rem] h-auto object-cover object-top  aspect-square rounded-full"
                />
                <span className="flex flex-col flex-wrap items-start justify-center w-36">
                  <p className="text-sm">{staffff.person?.name}</p>
                  <p className="text-xs">{staffff.positions}</p>
                </span>
                {/* 
                
                IDEA : AT THE RIGHT SIDE OF THE TRAILER I WILL CREATE TWO MORE THINGS CHARACTERS AND STAFF AND THAT WILL BE LIKE A BUTTON WILL BE THERE WHEN USE CLICK IT IT THE SAME WINDOW NEW DIV TYPE SOMETHING WILL COME UP LIKE A LOGGIN THING AND THERE WILL BE THE CHARACTERS OR STAFF AS CHOOSEN. AND ALSO A SEARCHING OPTION WILL BE THERE IF ANYONE SEARCH ANYONE BY NAME FOR STAFF, AND FOR CHARACTERS VOICE ACTOR WILL BE THERE FOR DIFFERNT LANGUAGE LIKE ENG, JAP, PORTUGESE ETC. AND KIND OF OF A DRAWER OR A TABLE WILL BE THERE FROM WHICH USER CAN SELECT THE LANGUAGE'S VOICE ACTOR ALSO SEARCH OPTION WILL BE PRESENT FOR IF SOMEONE WANTS TO CHECK SOMEONE VA. 
                
                */}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Staff;
