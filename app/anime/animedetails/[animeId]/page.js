"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Trailer from "@/components/Trailer/Trailer";
import Staff from "@/components/staff/Staff";
import Characters from "@/components/Characters/Characters";
import Recom from "@/components/Recommendation/Recom";
import Details from "@/components/MinimalDetails/Details";

const page = ({ params }) => {
  const { animeId } = params;
  const [anime, setAnime] = useState({});
  
  const getAnime = async (animeID) => {
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${animeID}`);
      const data = res.data.data;
      // console.log(data.images.jpg.image_url);
      setAnime(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(animeId);
    getAnime(animeId);
  }, []);

  return (
    <div className="w-screen flex items-center justify-center flex-col padding">
      <Details anime={anime}/>
      <Trailer vdolink={anime.trailer?.embed_url} />
      <Characters animeID={animeId} />
      <Staff animeID={animeId} />
      <Recom animeId={animeId} />
    </div>
  );
};

export default page;
