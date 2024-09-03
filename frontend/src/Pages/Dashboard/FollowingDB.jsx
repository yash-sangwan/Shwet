import React from "react";
import NavbarDB from "../../Components/Dashboard/NavbarDB";
import Sidebar from "../../Components/Dashboard/Sidebar";

const FollowingDB = () => {
  return (
    <>
      <NavbarDB />
      <div className="flex">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
          {/* Image */}
          <img
            src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.build_following_feed_darkmode.png-26-3fb93e1da358eb6e.png"
            alt=""
            className="w-1/12 max-w-2xl mb-8 rounded-lg"
          />

          {/* Headings */}
          <h1 className="text-3xl font-bold mb-4 text-center">Build your new following feed</h1>
          <h2 className="text-lg font-semibold text-center">Follow some Groups to start discovering stories in your feed.</h2>
        </div>
      </div>
    </>
  );
};

export default FollowingDB;
