import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute pt-[65%] md:pt-[12%] px-6 md:px-16 text-white bg-gradient-to-r from-black">
      <h1 className="text-lg md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block  py-6 text-lg w-[35%]">{overview}</p>
      <p>
        <button className="bg-white text-black text-lg p-2 my-2  px-8 rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white text-lg p-2 px-8 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </p>
    </div>
  );
};

export default VideoTitle;
