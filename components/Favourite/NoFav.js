import Image from "next/image";
import React from "react";

const NoFav = () => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Image
        src="/nofav.png"
        width={1200}
        height={1200}
        alt="No favorites yet"
        className="w-56 h-auto brightness-75 select-none"
        draggable="false"
      />
      <p className="mt-4 text-xl font-semibold text-gray-700">
        Oops! You haven’t added any favorites yet! 💔
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Let’s find some awesome anime to add! 🌟
      </p>
    </div>
  );
};

export default NoFav;
