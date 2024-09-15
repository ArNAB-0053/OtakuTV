import Image from "next/image";
import Link from "next/link";
import React from "react";

const Fetchstaff = ({ name, positions, image_url, url, width='' }) => {
  return (
    <span
      key={url}
      className={`${width} mb-2 flex items-center gap-x-3 justify-start`}
    >
      <Image
        src={image_url}
        width={1200}
        height={1200}
        className="w-[2.3rem] lg:w-[4.5rem] h-[2.3rem] lg:h-[4.5rem] object-cover object-top aspect-square rounded-full border "
        alt="Staff Image"
        draggable="false"
      />

      <span className="flex flex-col flex-wrap items-start justify-center w-36">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted">{positions}</p>
      </span>
    </span>
  );
};

export default Fetchstaff;
