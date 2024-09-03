import React from 'react';
// import { FeatureCards } from './HeroCards';
import assets from '../../assets/assets';
import FeatureCards from './FeaturesCard';

const Features = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-primaryBg p-24">
      {/* Left Component */}
      <div className="flex-shrink-0 ">
        {/* Render your left component here */}
        <FeatureCards/>
      </div>

      {/* Right Component */}
      <div className="text-white mt-10 md:mt-0 md:ml-10 max-w-md">
        <h2 className="text-5xl font-bold mb-6 font-museo">
          Take charge of what you share
        </h2>
        <img
          src={assets.vector1}
          className="right-32 md:pl-32 lg:pl-40 relative bottom-5 "
          alt="Vector Decoration"
        />
        <p className="text-lg mb-8">
          Shwet lets you take charge of your post, news, claims or whatever you bring to the public with zero-knowledge proofing mechanism using Reclaim Protocol.
        </p>
        {/* <button className="bg-primary text-black font-bold py-3 px-6 rounded-full">
          Explore Now
        </button> */}
      </div>
    </div>
  );
};

export default Features;
