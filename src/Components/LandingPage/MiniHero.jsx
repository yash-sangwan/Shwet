import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faWallet } from '@fortawesome/free-solid-svg-icons';

const SecurityAndTransaction = () => {
  return (
    <div id="explore-section" className="bg-primaryBg py-8 text-white flex flex-col space-y-8 px-4 md:pl-28 md:pr-28">
      
      {/* Encrypted Security */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faLock} className="text-3xl" />
          <div>
            <h3 className="text-2xl font-bold font-museo">Encrypted Security</h3>
          </div>
          <p className="text-secondaryText text-sm w-72">
            Our platform has a strict security system that is safe from name theft.
          </p>
        </div>

        {/* Diamond Divider */}
        <div className="hidden md:flex items-center space-x-1 mr-24">
          <div className="h-0.5 w-32 bg-white"></div>
          <div className="w-3 h-3 bg-white transform rotate-45"></div>
          <div className="h-0.5 w-32 bg-white"></div>
        </div>
      </div>

      {/* Fast Transaction */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Diamond Divider */}
        <div className="hidden md:flex items-center space-x-1 ml-10">
          <div className="h-0.5 w-32 bg-white"></div>
          <div className="w-3 h-3 bg-white transform rotate-45"></div>
          <div className="h-0.5 w-32 bg-white"></div>
        </div>
        
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faWallet} className="text-3xl" />
          <div>
            <h3 className=" font-museo text-2xl font-bold">Fast Transaction</h3>
          </div>
          <p className="text-secondaryText text-sm w-72">
            We have an easy, fast, and certainly not complicated purchase transaction flow.
          </p>
        </div>
      </div>

      {/* Centered Diamond Divider on Small Screens */}
      <div className="flex md:hidden justify-center items-center space-x-1">
        <div className="h-0.5 w-32 bg-white"></div>
        <div className="w-3 h-3 bg-white transform rotate-45"></div>
        <div className="h-0.5 w-32 bg-white"></div>
      </div>

    </div>
  );
}

export default SecurityAndTransaction;
