import React, { useState } from "react";
import axios from "axios";
import Notification from "../Notification";

const Signup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/signup", { name, email, password });
      
      if (response.status === 200) {
        setNotification({ message: "Sign up successful!", type: "success" });
        // Handle further actions if needed
      }
    } catch (err) {
      setNotification({ message: "An error occurred while signing up. Please try again.", type: "error" });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div
      className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
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
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {notification && (
          <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
        )}
      </div>
    </div>
  );
};

export default Signup;
