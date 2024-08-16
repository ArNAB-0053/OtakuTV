import Image from "next/image";
import { MdErrorOutline } from "react-icons/md";

const Trailer = ({ vdolink }) => {
  return (
    <div className="w-screen flex items-start justify-start flex-col padding gap-x-8">
      <h1 className="text-3xl font-bold mb-4 uppercase">Trailer</h1>
      <span className="w-full bg-[#282828] lg:w-[50rem] h-auto aspect-video flex items-center justify-center select-none">
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
            className="w-full select-none"
            alt="This video is not available"
            draggable="false"
          />
        )}
      </span>
    </div>
  );
};

export default Trailer;
