"use client"
import Image from "next/image";

const Trailer = ({ vdolink }) => {
  return (
    <div className="w-full flex items-start justify-start flex-col gap-x-8 mb-16">
      <h1 className="max-md:text-xl md:text-2xl lg:text-3xl font-bold mb-4 uppercase">Trailer</h1>
      <span className="w-full h-auto bg-white aspect-video flex items-start justify-start select-none">
        {vdolink ? (
          <iframe
            src={`${vdolink}?autoplay=0`}
            title="Inline Frame Example"
            className="w-full h-full"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            src="/error.png"
            width={1200}
            height={1200}
            className="w-full select-none aspect-video object-cover object-top"
            alt="This video is not available"
            draggable="false"
          />
        )}
      </span>
    </div>
  );
};

export default Trailer;
