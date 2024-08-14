import Image from "next/image";
import Link from "next/link";
import React from "react";

const FetchCharacters = ({ char_image_url, char_name, role }) => {
  return (
    <div className="mr-2 mb-2 flex items-center gap-x-3 justify-start">
      <Image
        src={char_image_url}
        width={1200}
        height={1200}
        className="w-[2.3rem] lg:w-[4rem] h-[2.3rem] lg:h-[4rem] object-cover object-top aspect-square rounded-full border"
        alt="Staff Image"
      />

      <span className="flex flex-col flex-wrap items-start justify-center w-[11.4rem]">
        <p className="text-sm font-semibold">{char_name}</p>
        <p className="text-xs text-muted">{role}</p>
      </span>
    </div>
  );
};

export default FetchCharacters;
