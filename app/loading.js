import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen absolute z-[9999] bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="banter-loader ">
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
        <div className="banter-loader__box"></div>
      </div>
    </div>
  );
};

export default Loading;
