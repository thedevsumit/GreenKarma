import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { GiHamburgerMenu } from "react-icons/gi";
const NavBar = () => {
  const { authUser } = useAuthStore();
  const getInitial = (fullName) => {
    if (!fullName) return "?";
    return fullName.trim()[0].toUpperCase();
  };
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 bg-green-50 h-[82px] w-full flex justify-between items-center border-[#bcbcbc] border-b-[1px] top-0 ">
      <div
        className=" text-[#699451] font-bold text-2xl flex items-center  mt-0 mr-0 mb-0 ml-5"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="greenkarma.png" alt="" className="nav-logo" />
        <div className="h-[38px] flex item-center justify-between">
          GreenKarma
        </div>
      </div>
      <ul className="gap-8 font-medium hidden lg:flex">
        <li
          className="btn"
          onClick={() => {
            navigate("/homepage");
          }}
        >
          Home
        </li>
        <li className="btn">About Us</li>
        <li className="btn">How It Works</li>
        <li
          className="btn"
          onClick={() => {
            navigate("/market");
          }}
        >
          Marketplace
        </li>
        <li className="btn">Impact</li>
        <li className="btn">Blog / Resources</li>
        <li className="btn">Contact Us</li>
      </ul>
      <div>
        {!authUser && (
          <button
            className="cursor-pointer px-6 py-3 bg-[#699451] rounded-[12px] text-green-50"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        )}

        {authUser && (
          <div className="items-center gap-2 cursor-pointer hidden lg:flex mr-[4px]">
            {authUser.profilePic ? (
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#699451] flex items-center justify-center text-white font-semibold mr-[10px]">
                {getInitial(authUser.fullName)}
              </div>
            )}
          </div>
        )}
        <div className="items-center gap-2 cursor-pointer flex lg:hidden">
          <GiHamburgerMenu className="text-3xl text-[#699451] mr-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
