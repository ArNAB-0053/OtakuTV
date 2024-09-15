"use client";

import Image from "next/image";

const Error = () => {
  return (
    <div className="w-screen h-[70vh] flex items-center justify-center flex-col">
      <Image
        src="/errorImg.png"
        width={1200}
        height={1200}
        alt="error"
        className="w-[20rem] h-48"
      />
      <p className="text-xl">504 : BadResponseException</p>
    </div>
  );
};

export default Error;
