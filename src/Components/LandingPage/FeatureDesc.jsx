import React from 'react';
import RightSection from './FeatureDescRight';

const FeatureDesc = () => {
  return (
    <div className="flex justify-between items-center h-screen px-24 py-10 bg-primaryBg">
      <div className="text-white max-w-lg">
        <h1 className="text-5xl font-bold mb-6">Create and sell your NFTs</h1>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend tellus risus nibh molestie lorem.
        </p>
        <div className="flex gap-6">
          <button className="bg-primary text-black font-semibold py-3 px-6 rounded-lg">
            Create New
          </button>
          <button className="border-2 border-primary text-primary font-semibold py-3 px-6 rounded-lg">
            Watch Video
          </button>
        </div>
      </div>
      <RightSection />
    </div>
  );
};

export default FeatureDesc;
