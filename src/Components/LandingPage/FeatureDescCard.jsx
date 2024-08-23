import React from 'react';

const FeatureDescCard = ({ imgSrc, title, description, rotateClass }) => {
  return (
    <div className={`bg-[#1A1A1A] p-8 rounded-lg shadow-lg text-white flex flex-col items-center max-w-xs transform ${rotateClass}`}>
      <img src={imgSrc} alt={title} className="mb-6 w-20 h-16" />
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  );
};

export default FeatureDescCard;
