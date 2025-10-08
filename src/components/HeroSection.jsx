import React from "react";

const HeroSection = () => {
  return (
    <div className="">
      {" "}
      <section className="bg-green-50  min-[1200px]:w-[1200px] m-auto pt-[100px] md:pt-[200px] flex items-center hero">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl md:text-6xl font-bold text-[#699451] leading-tight">
              Turn Waste into <br />{" "}
              <span className="text-[#699451]">Wealth</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-md">
              GreenKarma helps you earn rewards by responsibly segregating
              waste. Discover eco-friendly disposal methods and connect with
              recyclers near you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-[#699451] cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg transition">
                Get Started
              </button>
              <button className="border cursor-pointer border-[#699451] text-[#699451] hover:bg-green-100 px-6 py-3 rounded-lg transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="herosection.png"
              alt="GreenKarma illustration"
              className="rounded-xl heroimg"
            />
          </div>
        </div>
      </section>
      <img
        src="homepagefooter.png"
        alt=""
        className="mix-blend-multiply"
      />
    </div>
  );
};

export default HeroSection;
