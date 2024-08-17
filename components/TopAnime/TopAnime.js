import React from "react";

const TopAnime = async () => {
  const topAnime = await fetch("https://api.jikan.moe/v4/top/anime").then(
    (response) => response.json()
  );
  console.log(topAnime);
  return <div>Fetch</div>;
};

export default TopAnime;
