import React from "react";
import HeroCards from "./HeroCards";
import assets from "../../assets/assets";

const HeroSection = () => {
  return (
    <section className="bg-primaryBg text-primaryText px-4 lg:px-24 flex flex-col lg:flex-row justify-between min-h-screen">
      <div className="max-w-lg py-16 md:py-32">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 font-museo">
          Revolutionize Truth with zkTLS
        </h1>
        <img
          src={assets.vector1}
          className="pl-20 md:pl-32 lg:pl-40 relative bottom-5"
          alt="Vector Decoration"
        />
        <p className="mb-6 text-base md:text-lg">
          Why even trust the Internet? After all, Shwet is here to spill the
          beans
        </p>
        <div className="flex gap-2 md:gap-4">
          <button
  className="bg-primary text-primaryBg py-2 px-4 md:px-6 rounded font-semibold"
  onClick={() => window.open('https://youtu.be/MJnoen_rW4E', '_blank')}
>
  Watch Video
</button>


          <button className="text-primaryText py-2 px-4 md:px-6 border border-white rounded font-semibold" 
           onClick={() =>
            document
              .getElementById("faqs-section")
              .scrollIntoView({ behavior: "smooth" })
          }
          >
            FAQs
          </button>
        </div>
      </div>

      <div className="relative w-full">
        <div className="h-[300px] md:h-[500px] lg:h-[772px] w-full md:w-[772px] absolute inset-0 bg-hero-pattern bg-cover bg-center z-0"></div>
        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 flex z-10">
          <div
            className="w-[200px] md:w-[500px] lg:w-[700px] h-[200px] md:h-[500px] lg:h-[700px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(255, 215, 0, 0.3) 1%, rgba(255, 215, 0, 0.15) 40%, rgba(255, 215, 0, 0) 70%)`,
            }}
          ></div>
        </div>
        <div className="absolute bottom-10 md:bottom-24 inset-0 flex items-center justify-center z-20">
          <HeroCards />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
