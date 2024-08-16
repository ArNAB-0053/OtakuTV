import Image from "next/image";
import React from "react";

const FetchVoiceActor = ({ vc_image_url, vc_name, lang, style }) => {
  return (
    <div className="flex items-center justify-start gap-x-3">
      <span className="flex flex-col flex-wrap items-end justify-center w-48">
        <p className="text-sm font-semibold text-end">{vc_name}</p>
        <p className="text-xs text-muted">{lang}</p>
      </span>
      <Image
        src={vc_image_url}
        width={1200}
        height={1200}
        className={`w-[2.3rem] lg:w-[4rem] h-[2.3rem] lg:h-[4rem] object-cover object-top aspect-square rounded-full border ${style}`}
        alt="Staff Image"
      />
    </div>
  );
};

export default FetchVoiceActor;
