import React from 'react';
import FeatureDescCard from './FeatureDescCard';
import assets from '../../assets/assets';

const RightSection = () => {
  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="flex flex-col gap-8">
    <FeatureDescCard
      imgSrc={assets.createPost}
      title="1. Create Post"
      description="Begin by creating your post."
      rotateClass="rotate-0 skew-x-0 skew-y-6"
    />
    <FeatureDescCard
      imgSrc={assets.uploadPost}
      title="2. Add Content & Its Source"
      description="Upload your content, whether it's an image, text, or other media. Ensure each piece is backed by its source, making your post credible and traceable."
      rotateClass="rotate-0 skew-x-0 skew-y-6"
    />
  </div>
  <div className="flex justify-center items-center">
    <FeatureDescCard
      imgSrc={assets.verifyPost}
      title="3. Proof of Authentication"
      description="Authenticate your content by providing proof of its source, whether through identity verification or other means. Secure your post against unauthorized alterations and select from various publishing formats.."
      rotateClass="rotate-0 skew-x-0 skew-y-6"
    />
  </div>
</div>

  );
};

export default RightSection;

