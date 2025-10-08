import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { PiLinkBold } from "react-icons/pi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { usePostStore } from "../store/usePostStore";
const ProfileLeft = () => {
  const { authUser, role, setRole } = useAuthStore();
  const {
    fetchingPurchases,
    fetchingData,
    fetchingMyListed,
    fetchingMyListedItems,
  } = usePostStore();
  return (
    <div className="w-[225px]  mt-[135px] fixed">
      <div className="w-[225px] relative pb-[20px] bg-white rounded-[10px]">
        <img
          src="bgprofle.png"
          alt=""
          className="w-[225px] h-[58px] fixed  rounded-t-[10px]"
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
      <div className="w-[225px] h-[96px] bg-white rounded-[10px] mt-[18px] flex-col justify-center items-center px-[24px] py-[10px]">
        <div className="flex justify-between items-center">
          {" "}
          <p className="text-[14px] font-medium">Wallet  </p>
          <div className=" flex justify-center items-center">
            {" "}
            <span className="text-[14px] font-bold text-blue-600">
              {authUser.wallet}
            </span>
            <img src="wallet.png" alt="" className="w-[41px] h-[40px]" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          {" "}
          <p className="text-[14px] font-medium">Points  </p>
          <div className=" flex justify-center items-center">
            {" "}
            <span className="text-[14px] font-bold text-blue-600">
              {authUser.points}
            </span>
            <img src="points.png" alt="" className="w-[40px] h-[40px]" />
          </div>
        </div>
      </div>
      <div className="w-[225px] h-[60px] bg-white mt-[20px] flex justify-center items-center">
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
      <div className="w-[225px]  bg-white mt-[20px] flex justify-center items-center py-[10px]">
        <div className="flex-col justify-around items-center ml-[10px]">
          <p
            className="text-[15px] w-[200px] mx-auto ml-[25px] flex justify-start items-center gap-[10px] cursor-pointer"
            onClick={() => {
              fetchingPurchases();
            }}
          >
            My Purchases <PiLinkBold className="text-blue-900" />
          </p>
          <p
            className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
            onClick={() => {
              fetchingMyListed();
            }}
          >
            My Sales <PiLinkBold className="text-blue-900" />
          </p>
          <p
            className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
            onClick={() => {
              fetchingMyListedItems();
            }}
          >
            My Listed items <PiLinkBold className="text-blue-900" />
          </p>
          <p
            className="text-[15px] flex w-[200px] mx-auto ml-[25px] justify-start items-center gap-[10px] cursor-pointer"
            onClick={() => {
              fetchingData();
            }}
          >
            All Posts <PiLinkBold className="text-blue-900" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
