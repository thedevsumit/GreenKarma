import React from "react";
import NavBar from "../components/NavBar";
import Posts from "../components/Posts";
import ProfileLeft from "../components/ProfileLeft";
import SendPost from "../components/SendPost";

const Marketplace = () => {
  return (
    <>
      <NavBar />
      <div className="flex w-[1000px] mx-auto gap-[30px] h-[calc(100vh-64px)]">
        <div className="w-64 flex-shrink-0 sticky top-0 h-[calc(100vh-64px)] overflow-auto scrollbar-hide">
          <ProfileLeft />
        </div>

        <div className="flex-1 flex flex-col overflow-auto h-screen scrollbar-hide right-[110px] relative">
          <SendPost />
          <Posts />
        </div>
      </div>
    </>
  );
};

export default Marketplace;
