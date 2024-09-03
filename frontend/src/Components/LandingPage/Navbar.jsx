import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignupOTPOpen, setIsSignupOTPOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSheet = (type) => {
    if (type === "signup") {
      setIsSignupOpen(true);
    } else if (type === "login") {
      setIsLoginOpen(true);
    }
  };

  const closeAllSheets = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsSignupOTPOpen(false);
  };

  const openSignupOTP = () => {
    setIsSignupOpen(false);
    setIsSignupOTPOpen(true);
  };

  const handleGetStartedClick = () => {
    navigate('/read/home'); // Redirect to /read
  };

  return (
    <nav className="bg-gradient-to-r bg-primaryBg text-primaryText py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex flex-col">
          <span className="font-bold text-xl">Shwet</span>
          <span className="text-sm text-secondaryText">New Age Truth-Chain</span>
        </div>
      </div>

      <div className="hidden md:flex space-x-4">
        <button
          className="border border-primary text-primary py-2 px-4 rounded hover:bg-primary hover:text-primaryBg transition duration-300"
          onClick={() => openSheet("login")}
        >
          Login
        </button>
        <button
          className="bg-primary text-primaryBg py-2 px-4 rounded hover:bg-secondary transition duration-300"
          onClick={handleGetStartedClick} // Handle redirection here
        >
          Get Started for free
        </button>
      </div>

      <div className="flex md:hidden space-x-4">
        <button
          className="bg-yellow-500 text-primaryBg py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
          onClick={handleGetStartedClick} // Handle redirection here
        >
          Get Started
        </button>
        <button
          className="text-yellow-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-primaryBg bg-opacity-95 flex flex-col items-center justify-center space-y-4 z-50">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <button
            className="border border-yellow-500 text-yellow-500 py-2 px-4 rounded hover:bg-yellow-500 hover:text-primaryBg transition duration-300"
            onClick={() => {
              openSheet("login");
              toggleMenu();
            }}
          >
            Login
          </button>
          <button
            className="bg-yellow-500 text-primaryBg py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            onClick={handleGetStartedClick}
          >
            Get Started for free
          </button>
        </div>
      )}

      {isLoginOpen && (
        <div className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50">
          <Login onClose={closeAllSheets} />
        </div>
      )}

      {isSignupOpen && (
        <div className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50">
          <Signup onClose={closeAllSheets} openSignupOTP={openSignupOTP} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
