"use client";

import Image from "next/image";

const Error = () => {
  return (
    <div className="w-screen h-[16rem] mb-7 flex items-center justify-center flex-col">
      <Image
        src="/errorImg.png"
        width={1200}
        height={1200}
        alt="error"
        className="w-[20rem] h-48"
      />
      <p className="text-sm lg:text-xl text-center ">Something went wrong. Please try again later...</p>
    </div>
  );
};

export default Error;
