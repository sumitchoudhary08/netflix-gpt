import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute pt-[20%] px-20 text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-[35%]">{overview}</p>
      <button className="bg-white text-black text-lg p-2 px-8 rounded-lg hover:bg-opacity-80">
        Play
      </button>
      <button className="mx-2 bg-gray-500 text-white text-lg p-2 px-8 rounded-lg hover:bg-opacity-80">
        More Info
      </button>
    </div>
  );
};

export default VideoTitle;
