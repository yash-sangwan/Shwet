import React from "react";
import { motion } from "framer-motion";
import assets from "../../assets/assets";

const HeroCard = ({
  image,
  name,
  price,
  likes,
  timeLeft,
  bids,
  animation,
  zIndex,
}) => {
  return (
    <motion.div
      className="bg-[#1B1B21] text-primaryText p-4 md:p-6 rounded-xl shadow-lg w-60 md:w-80 border-4"
      style={{
        borderImage: "linear-gradient(to right, black, transparent)",
        zIndex: zIndex, // Add zIndex style
      }}
      initial={{
        translateX: 0,
        translateY: 0,
      }}
      animate={{
        translateX: window.innerWidth >= 768 ? animation.translateX : 0,
        translateY: window.innerWidth >= 768 ? animation.translateY : 0,
      }}
      whileHover={{
        rotateY: 15, // Rotate on hover
        translateZ: 50, // Pop out on hover
      }}
      transition={{
        type: "spring",
        stiffness: 100,
      }}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 md:h-64 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 bg-white text-black font-semibold rounded-full p-1 shadow-md">
          <i className="fa-solid fa-heart" style={{ color: "#eb0505" }}></i>{" "}
          {likes}
        </div>
      </div>
      <div className="p-2 md:p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">
            <i className="fa-regular fa-clock pr-1"></i>
            {timeLeft}
          </span>
          <span className="text-xs text-gray-400">
            <i className="fa-solid fa-eye pr-1"></i> {bids}
          </span>
        </div>
        <h3 className="font-bold text-sm md:text-lg mb-1">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold text-sm md:text-md">
            {price}
          </span>
          <button className="bg-primary text-black py-1 px-3 md:py-2 md:px-5 rounded-full font-semibold">
            Verify
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const HeroCards = () => {
  const nftData = [
    {
      image: `${assets.profile1}`,
      name: "New Age Truth Chain!",
      price: "by Shwet",
      likes: 684,
      timeLeft: "10m",
      bids: "1.6k",
      animation: {
        translateX: 80, // Move diagonally right-down
        translateY: -40, // Move diagonally right-down
      },
      zIndex: 20, // Assign zIndex for first card
    },
    {
      image: `${assets.profile2}`,
      name: "Web3 at it boom",
      price: "by John Doe ",
      likes: "1.3k",
      timeLeft: "1h",
      bids: "754",
      animation: {
        translateX: -30, // Move diagonally left-up
        translateY: 50, // Move diagonally left-up
      },
      zIndex: 10, // Assign zIndex for second card
    },
  ];

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
      {nftData.map((nft, index) => (
        <HeroCard key={index} {...nft} />
      ))}
    </div>
  );
};



export default HeroCards;
