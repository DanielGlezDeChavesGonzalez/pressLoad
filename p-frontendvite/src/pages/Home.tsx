// import userFoto from "../assets/userimage.webp"
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useState } from "react";

import LateralPanel from "../components/LateralPanel";

export default function Home() {
  // const imageSrc = "../assets/userimage.webp";

  return (
    <div className="flex flex-row min-h-full bg-gray-200">
      <LateralPanel />
      <div className="flex-1 flex flex-col items-center justify-stretch ">
        {/* <h1 className="text-2xl font-bold mb-4">Home</h1>
          <p className="text-gray-700">This is the Home component.</p> */}
        <div className="flex justify-center my-5 w-2/3 p-30 border-2 mx-auto rounded-lg">
          <p>First chart</p>
        </div>
        <div className="flex justify-center my-5 w-2/3 p-30 border-2 mx-auto rounded-lg">
          <p>Second chart</p>
        </div>
        <div className="flex my-5 w-2/3 p-30 border-2 rounded-lg">
          <p className="flex justify-items-start ">Third chart</p>
        </div>
        <div className="border-t border-gray-300 my-4 mx-auto w-full"> </div>
        <div className="flex items-center justify-center "></div>
      </div>
    </div>
  );
}
