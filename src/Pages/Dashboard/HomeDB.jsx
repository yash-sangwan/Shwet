import React, { useState } from 'react';
import NavbarDB from '../../Components/Dashboard/NavbarDB';
import Sidebar from '../../Components/Dashboard/Sidebar';
import Post from '../../Components/Dashboard/HomeDB/Post';
import { posts } from '../../assets/post';
import RightSidebar from '../../Components/Dashboard/RightSidebar';

const HomeDB = () => {
  // State to manage the view layout
  const [isGridView, setIsGridView] = useState(false);

  // Function to toggle between grid and column views
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <>
      {/* Navbar at the top */}
      <NavbarDB />

      {/* Main container with grid layout */}
      <div className="grid grid-cols-12 gap-4 h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="col-span-2">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="col-span-8 pt-16 bg-gray-900 h-full overflow-y-auto p-6">
          {/* Container for Toggle Button */}
          <div className=" z-20 bg-gray-900 ">
            <button
              className={`p-2 ${isGridView ? 'bg-gray-700' : 'bg-gray-700'} text-white rounded-md flex sticky top-0 `}
              onClick={toggleView}
            >
              {isGridView ? <i className="fa-regular fa-square"></i> : <i className="fa-solid fa-border-all"></i>}
            </button>
          </div>

          {/* Posts Section */}
          <div className={`grid ${isGridView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 mt-3`}> 
            {/* Render Posts */}
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-2 bg-gray-100 h-full overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default HomeDB;
