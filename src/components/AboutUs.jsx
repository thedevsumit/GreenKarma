import React from "react";

const AboutUs = () => {
  return (
    <>
      {/* Heading Section */}
      <div className="mt-[100px] lg:w-[1110px] m-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-[#699451] leading-tight text-center">
          About Us
        </h1>
        <div className="w-full sm:max-w-[800px] m-auto py-[50px] text-[16px] sm:text-[18px] md:text-[19px] text-center">
          "At GreenKarma, we believe every small step towards sustainability
          creates a ripple effect. Our mission is to empower individuals and
          businesses to make eco-friendly choices effortlessly."
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-[40px]">
        <div className="rounded-[10px] h-[500px] w-[330px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] sm:w-[300px] md:w-[350px] lg:w-[350px] overflow-hidden">
          <img
            src="about1.webp"
            alt=""
            className="h-[200px] w-full object-cover rounded-t-[10px]"
          />
          <h1 className="text-[24px] sm:text-[24px] text-[#699451] font-bold mt-4 px-10">
            Our Mission
          </h1>
          <p className="text-[16px] sm:text-[16px] md:text-[17px] mt-2 px-10 pb-4 leading-relaxed text-gray-700">
            At GreenKarma, our mission is to make sustainable living simple and
            accessible. We strive to inspire communities meaningful actions that
            lead to a greener planet. We can turn everyday choices into lasting
            positive change.
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[330px] sm:w-[300px] md:w-[350px] lg:w-[350px] overflow-hidden">
          <img
            src="about2.webp"
            alt=""
            className="h-[200px] w-full object-cover rounded-t-[10px]"
          />
          <h1 className="text-[24px] sm:text-[24px] text-[#699451] font-bold mt-4 px-10">
            What We Do
          </h1>
          <p className="text-[16px] sm:text-[16px] md:text-[17px] mt-2 px-10 pb-4 leading-relaxed text-gray-700">
            GreenKarma connects individuals and businesses with eco-conscious
            solutions. From reducing waste to promoting sustainable products, we
            provide practical ways for everyone to make a positive impact on the
            environment.
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[330px] sm:w-[300px] md:w-[350px] lg:w-[350px] overflow-hidden">
          <img
            src="about3.webp"
            alt=""
            className="h-[200px] w-full object-cover rounded-t-[10px]"
          />
          <h1 className="text-[24px] sm:text-[24px] text-[#699451] font-bold mt-4 px-10">
            Our Vision
          </h1>
          <p className="text-[16px] sm:text-[16px] md:text-[17px] mt-2 px-10 pb-4 leading-relaxed text-gray-700">
            We envision a world where sustainability is a natural part of life.
            GreenKarma aims to inspire a global community of conscious consumers
            and responsible businesses to restore and protect the planet.
          </p>
        </div>

        <div className="rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[330px] sm:w-[300px] md:w-[350px] lg:w-[350px] overflow-hidden">
          <img
            src="about4.webp"
            alt=""
            className="h-[200px] w-full object-cover rounded-t-[10px]"
          />
          <h1 className="text-[24px] sm:text-[24px] text-[#699451] font-bold mt-4 px-10">
            Join Our Journey
          </h1>
          <p className="text-[16px] sm:text-[16px] md:text-[17px] mt-2 px-10 pb-4 leading-relaxed text-gray-700">
            Every action counts. Join GreenKarma to embrace eco-friendly habits,
            reduce waste, and support sustainable initiatives. Together, we can
            create a cleaner, healthier, and greener future for all.
          </p>
        </div>
      </div>

      {/* Footer Image */}
      <img
        src="aboususfooter.webp"
        alt=""
        className="mt-[50px] w-full h-auto object-cover"
      />
    </>
  );
};

export default AboutUs;
