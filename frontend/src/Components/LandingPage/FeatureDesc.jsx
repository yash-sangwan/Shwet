import React from 'react';
import RightSection from './FeatureDescRight';
import { useNavigate } from 'react-router-dom';

const FeatureDesc = () => {

    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/read/home');
    };


  return (
    <div className="flex justify-between items-center h-screen px-24 py-10 bg-primaryBg">
      <div className="text-white max-w-lg">
        <h1 className="text-5xl font-bold mb-6">Create and share, without any fear</h1>
        <p className="text-lg mb-8">
          Shwet prevents unauthorized copyrights of your content, ensuring that every content of yours uniquely belongs to you!
        </p>
        <div className="flex gap-6">
          <button className="bg-primary text-black font-semibold py-3 px-6 rounded-lg" onClick={handleClick} >
            Get Started
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
