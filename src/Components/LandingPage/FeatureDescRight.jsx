import React from 'react';
import FeatureDescCard from './FeatureDescCard';
import assets from '../../assets/assets';

const RightSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-8">
        <FeatureDescCard
          imgSrc={assets.createPost}
          title="1. Create Artwork"
          description="Create your collection. Add social links, profile and banner images, and set a secondary sales fee."
          rotateClass="rotate-0 skew-x-0 skew-y-6"
        />
        <FeatureDescCard
          imgSrc={assets.uploadPost}
          title="2. Upload NFTs"
          description="Upload your work, customize your NFTs with properties, stats, and unlockable content."
          rotateClass="rotate-0 skew-x-0 skew-y-6"
        />
      </div>
      <div className="flex justify-center items-center">
        <FeatureDescCard
          imgSrc={assets.verifyPost}
          title="3. Fixed Listing"
          description="Set up and choose between auctions, fixed-price listings, and declining-price listings."
          rotateClass="rotate-0 skew-x-0 skew-y-6"
        />
      </div>
    </div>
  );
};

export default RightSection;

