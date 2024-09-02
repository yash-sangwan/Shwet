import React, { useState, useEffect } from "react";
import assets from "../../assets/assets";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = ({ onClose }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState('user@xyz.com'); // Prefilled email
  const [password, setPassword] = useState('mvpuser@123'); // Prefilled password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility 
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to check if JWT token exists in localStorage
  const checkAuthToken = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Token exists, stay on the current page
    }
  };

  // Run checkAuthToken on component mount
  useEffect(() => {
    checkAuthToken();
  }, []);

  // Function to handle JWT expiration
  const setTokenExpiry = () => {
    setTimeout(() => {
      localStorage.removeItem('jwtToken');
      alert("Session expired. Please log in again.");
      navigate('/'); // Redirect to login after token expiration
    }, 2 * 60 * 60 * 1000); // Set expiration to 2 hours
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5505/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful', data);

      const token = data.token;
      localStorage.setItem('jwtToken', token); // Store JWT token in localStorage

      setTokenExpiry(); // Set token expiration timeout
      onClose(); 
      navigate('/read/home')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openSignup = () => {
    setIsSignupOpen(true);
  };

  const closeSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="relative flex justify-center items-center max-h-screen overflow-y-auto">
        <button className="absolute top-4 right-4 text-primaryText" onClick={onClose}>
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

        <div className="w-full max-w-2xl p-8 pt-12 bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2 md:pr-4 md:border-r border-gray-700 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-5xl font-bold text-yellow-500 mb-2">Shwet</h1>
              <p className="text-white mb-4 ">
                A place to share knowledge and better understand the world
              </p>
            </div>

            <p className="text-gray-400 text-sm text-center md:text-left mb-6">
              By continuing, you indicate that you agree to Shwet's{" "}
              <a href="#" className="text-yellow-500 hover:cursor-not-allowed">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-yellow-500 hover:cursor-not-allowed">
                Privacy Policy
              </a>
              .
            </p>

            <div className="mb-6">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-2 rounded flex items-center justify-center mb-4 pr-6 hover:cursor-not-allowed">
                <img
                  src={assets.googleIcon}
                  alt="Google"
                  className="w-7 h-4 mr-3"
                />
                Continue with Google
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center hover:cursor-not-allowed">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="w-5 h-5 mr-3"
                />
                Continue with Facebook
              </button>
            </div>

            <hr className="border-gray-700 mb-6" />

            <p className="text-gray-400 text-sm text-center md:text-left mb-6">
              <button
                onClick={openSignup}
                className="text-yellow-500 hover:underline hover:cursor-not-allowed"
              >
                Sign up with email
              </button>
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 md:pl-4 flex flex-col justify-center">
            <h2 className="text-white text-2xl font-semibold mb-6 text-center md:text-left">
              Login
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 text-gray-400"
                  >
                    {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <a href="#" className="text-sm text-yellow-500 hover:cursor-not-allowed">
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSignupOpen && <Signup onClose={closeSignup} />}
    </div>
  );
};

export default Login;
