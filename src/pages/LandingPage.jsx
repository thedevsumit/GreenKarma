import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import ServicesFeatures from "../components/Services";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <AboutUs />
      <ServicesFeatures />
    </>
  );
};

export default LandingPage;
