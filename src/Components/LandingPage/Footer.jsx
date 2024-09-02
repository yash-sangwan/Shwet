import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primaryBg text-white py-10">
      <div className="container mx-auto px-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         
          <div className="flex flex-col items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Office Location</h4>
            <p className="mb-1">Beaumont House, 27 Clements Lane,</p>
            <p className="mb-1">London, England, EC4N 7AE</p>
            <p className="mb-1">Monday to Friday from 8:00 to 18:00</p>
            <p className="mb-1">info@newagepartners.co.uk</p>
            <p className="mb-1">+44(0)208 126 9955</p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Payments</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Exchange</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">B2B Invoicing</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Businesses</h4>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Institutions</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Forex & CFD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Online Gaming</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Ecommerce</a></li>
            </ul>
          </div>
        </div> */}

        <div className="mt-10 flex items-center border-t border-gray-700 pt-6">
          <div className="mb-4">
            {/* <img src="path/to/logo.png" alt="NACE" className="h-12" /> */}
          </div>

          <div className="text-center md:text-left max-w-2xl mx-auto">
            <p className="text-yellow-500 font-semibold mb-2">
              Shwet - Verifiable Truth-Chain on Solana
            </p>
            <p className="text-gray-400 text-sm">
              Shwet allows you to securely store and share data with proof of
              authentication, ensuring the integrity of facts, news, and media.
              While Shwet enhances data security, remember that digital assets
              carry high risks and their value is not indicative of future
              performance.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-sm text-gray-400">
            &copy; 2024 Shwet All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/yash-sangwan/Shwet"
              className="text-white hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://x.com/beshwet"
              className="text-white hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Custom SVG for X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
