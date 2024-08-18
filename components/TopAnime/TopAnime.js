"use client";
import { useState, useEffect } from "react";
import Random from "../Random";
import { useDeviceWidthContext } from '@/context/page';
import axios from "axios";

// eslint-disable-next-line @next/next/no-async-client-component
const TopAnime = () => {
  const [anime, setAnime] = useState([]);

  const getTopAnime = async () => {
    try {
      const res = await axios.get("https://api.jikan.moe/v4/top/anime");
      const data = res.data.data;
      setAnime(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopAnime();
  }, []);

  useEffect(() => {
    console.log(anime); // Log updated `anime` state
  }, [anime]);

  const deviceWidth = useDeviceWidthContext();
  console.log(deviceWidth)

  return (
    <div>
      <h1>Top Anime {deviceWidth}</h1>
      <Random />
    </div>
  );
};

export default TopAnime;
