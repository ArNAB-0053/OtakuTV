import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Recom = ({ animeId }) => {
  const [recom, setRecom] = useState([]);

  const getRecommendation = async (animeID) => {
    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeID}/recommendations`
      );
      const data = res.data.data;
      console.log(data[0].entry.mal_id);
      setRecom(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(recom)
  useEffect(() => {
    // console.log(animeId);
    getRecommendation(animeId);
  }, []);

  return (
    <div className="w-full py-16 flex flex-col items-start justify-start">
      <h1 className="text-3xl font-bold mb-4 uppercase">Recommended</h1>
      <div className="flex items-start justify-start flex-wrap  gap-16">
        {recom &&
          recom.length > 0 &&
          recom.slice(0, 15).map((recomm) => {
            return (
              <Link
              href={`${recomm.entry?.mal_id}`}
                key={recomm.entry?.mal_id}
                className="flex items-center justify-start flex-col w-48 h-64 aspect-[9/16] object-cover object-top gap-3"
              >
                <Image
                  src={recomm.entry?.images?.jpg?.large_image_url}
                  width={200}
                  height={200}
                  className="w-full h-full rounded-[0.6rem]"
                  alt={recomm.entry?.title}
                />
                <h1 className="w-48 text-center">{recomm.entry?.title.length > 17 ? recomm.entry?.title.slice(0, 17) + "...": recomm.entry?.title}</h1>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Recom;
