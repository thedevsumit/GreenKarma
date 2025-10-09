import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { PiLinkBold } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { usePostStore } from "../store/usePostStore";
const NavBar = () => {
  const { authUser } = useAuthStore();
  const getInitial = (fullName) => {
    if (!fullName) return "?";
    return fullName.trim()[0].toUpperCase();
  };
  const { role, setRole } = useAuthStore();
  const {
    fetchingPurchases,
    fetchingData,
    fetchingMyListed,
    fetchingMyListedItems,
  } = usePostStore();
  const [showProfileLeft, setShowProfileLeft] = useState(false);

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
      {authUser && (
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
      )}
      <div>
        {!authUser && (
          <button
            className="cursor-pointer px-6 py-3 bg-[#699451] mr-[20px] rounded-[12px] text-green-50"
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
        {authUser && (
          <div className="items-center gap-2 cursor-pointer flex lg:hidden">
            <GiHamburgerMenu
              className="text-3xl text-[#699451] mr-[10px]"
              onClick={() => setShowProfileLeft((prev) => !prev)}
            />
          </div>
        )}
        {showProfileLeft && (
          <div
            className={`fixed top-[82px] right-0 h-[calc(100vh-82px)] w-[260px] bg-green-50 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
              showProfileLeft ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="w-[250px] mt-[20px] fixed">
              <div className="w-[250px] relative pb-[20px] bg-white rounded-[10px]">
                <img
                  src="bgprofle.png"
                  alt=""
                  className="w-[250px] h-[58px] fixed  rounded-t-[10px]"
                />

                {authUser ? (
                  authUser.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt="Profile"
                      className="w-[72px] h-[72px] object-cover rounded-lg"
                    />
                  ) : (
                    <span className="w-[72px] h-[72px] rounded-full bg-[#699451] flex items-center justify-center text-white font-bold text-lg border-2 border-[#699451] relative top-[20px] left-[14px] cursor-pointer">
                      {authUser.fullName
                        ? authUser.fullName.trim()[0].toUpperCase()
                        : "?"}
                    </span>
                  )
                ) : (
                  <span>?</span>
                )}
                <div className="top-[20px] relative text-[20px] font-bold ml-[25px] flex justify-start gap-[2px] items-center">
                  {authUser.fullName}
                  <MdOutlineVerifiedUser className="mt-[3px]" />
                </div>
                <div className="text-[13px] w-[200px] mx-auto top-[20px] ml-[25px] relative flex-col justify-end">
                  Signed in as {role}
                </div>
                <div className="text-[14px] w-[200px] mx-auto top-[30px] ml-[25px] relative flex-col justify-end">
                  {authUser.address}
                  <FaLocationDot className="text-[20px] relative right-[-135px] top-[-20px] " />
                </div>
              </div>
              <div className="w-[250px] h-[96px] bg-white rounded-[10px] mt-[18px] flex-col justify-center items-center px-[24px] py-[10px]">
                <div className="flex justify-between items-center">
                  {" "}
                  <p className="text-[14px] font-medium">Wallet </p>
                  <div className=" flex justify-center items-center">
                    {" "}
                    <span className="text-[14px] font-bold text-blue-600">
                      {authUser.wallet}
                    </span>
                    <img
                      src="wallet.png"
                      alt=""
                      className="w-[41px] h-[40px]"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  {" "}
                  <p className="text-[14px] font-medium">Points </p>
                  <div className=" flex justify-center items-center">
                    {" "}
                    <span className="text-[14px] font-bold text-blue-600">
                      {authUser.points}
                    </span>
                    <img
                      src="points.png"
                      alt=""
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[250px] h-[60px] bg-white mt-[20px] flex justify-center items-center">
                <div className="flex justify-around items-center ml-[10px]">
                  <p
                    className="text-[14px]"
                    onClick={() => {
                      setRole();
                      console.log(role);
                    }}
                  >
                    Want to Switch to {role === "Buyer" ? "Seller" : "Buyer"} ?{" "}
                  </p>
                  <AiOutlineUserSwitch
                    className="text-[25px]"
                    onClick={() => {
                      setRole();
                      console.log(role);
                    }}
                  />
                </div>
              </div>
              <div className="w-[250px]  bg-white mt-[20px] flex justify-center items-center py-[10px]">
                <div className="flex-col justify-around items-center ml-[10px]">
                  <p
                    className="text-[15px] w-[200px] mx-auto ml-[25px] flex justify-start items-center gap-[10px] cursor-pointer"
                    onClick={() => {
                      fetchingPurchases();
                      setShowProfileLeft((prev) => !prev);
                    }}
                  >
                    My Purchases <PiLinkBold className="text-blue-900" />
                  </p>
                  <p
                    className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
                    onClick={() => {
                      fetchingMyListed();
                      setShowProfileLeft((prev) => !prev);
                    }}
                  >
                    My Sales <PiLinkBold className="text-blue-900" />
                  </p>
                  <p
                    className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
                    onClick={() => {
                      fetchingMyListedItems();
                      setShowProfileLeft((prev) => !prev);
                    }}
                  >
                    My Listed items <PiLinkBold className="text-blue-900" />
                  </p>
                  <p
                    className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
                    onClick={() => {
                      fetchingData();
                      setShowProfileLeft((prev) => !prev);
                    }}
                  >
                    All Posts <PiLinkBold className="text-blue-900" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
