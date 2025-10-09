import React from "react";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutUs />
      <ServicesFeatures />
    </div>
  );
};

export default HomePage;
