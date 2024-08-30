import React from 'react';
import { trending } from '../../assets/post';

const RightSidebar = () => {
  return (
    <div className="fixed pt-24 right-0 top-0 h-screen w-72 bg-gray-900 text-white p-4 space-y-6">
      {/* Subscribe Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Subscribe to Premium</h2>
        <p className="text-sm mb-4">
          Subscribe to unlock new features and if eligible, receive a share of ads revenue.
        </p>
        <button className="bg-primary text-black py-2 px-4 rounded-full w-full hover:bg-secondary">
          Subscribe
        </button>
      </div>

      {/* What's Happening Section */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">What's happening</h2>
        
        {/* Trending Item */}
        <div className="mb-4">
          <div className="flex items-start mb-2">
            <img
              src="https://via.placeholder.com/50"
              alt="Trending Image"
              className="w-12 h-12 rounded mr-3"
            />
            <div>
              <p className="text-sm font-bold">Flau'jae x Lil Wayne "Came Out A Beast" Music Video Premiere</p>
              <p className="text-xs text-gray-400">Music Video · Last night</p>
            </div>
          </div>
        </div>

        {/* More Trending Items */}
        {
          trending.map((item, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm font-bold">{item.title}</p>
            <p className="text-xs text-gray-400">{item.description}</p>
          </div>
        ))}

        <button className="text-blue-500 text-sm hover:underline">
          Show more
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
