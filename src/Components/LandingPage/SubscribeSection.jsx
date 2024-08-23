import React from 'react';

const SubscribeSection = () => {
  return (
    <div className="w-full h-full bg-primaryBg py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4 font-museo">
            Subscribe and Get Updates Every Week.
          </h2>
          <p className="text-gray-400">
            We have a blog related to NFT so we can share thoughts and routines
            on our blog which is updated weekly.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="w-full md:w-auto flex-grow p-4 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 rounded-lg">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
