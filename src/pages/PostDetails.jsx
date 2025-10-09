import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { Loader } from "lucide-react";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../store/useAuthStore";
import { MdSubtitles } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";

const PostDetails = () => {
  const { id } = useParams();
  const { fetchedData, fetchingData, purchaseItem } = usePostStore();
  const [post, setPost] = useState(null);
  const { authUser } = useAuthStore();
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  useEffect(() => {
    if (fetchedData.length === 0) {
      fetchingData();
    }
  }, [fetchedData, fetchingData]);

  useEffect(() => {
    if (fetchedData.length > 0) {
      const found = fetchedData.find((item) => item._id === id);
      setPost(found || null);
    }
  }, [fetchedData, id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-12 animate-spin text-[#699451]" />
      </div>
    );
  }

  const handlePurchase = async () => {
    setLoadingPurchase(true);
    try {
      await purchaseItem({
        itemId: post._id,
        paymentMethod: "Wallet",
        title: post.title,
        description: post.description,
        category: post.category,
        price: post.price,
        image: post.image,
        username: post.username || post.seller?.username || "Anonymous",
        avatar: post.avatar || post.seller?.avatar || "",
        address: post.address || "",
      });
    } catch (err) {
      console.error(err);
      alert("Purchase failed. Try again later.");
    } finally {
      setLoadingPurchase(false);
      setShowPopup(false);
    }
  };

  const sellerName =
    post.username || post.seller?.username || post.seller?.email || "Anonymous";
  const sellerAvatar = post.avatar || post.seller?.avatar || null;

  return (
    <>
      <NavBar />
      <div className="lg:w-[1024px] mx-auto mt-30 lg:flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-[80vw] mx-auto lg:w-[600px] bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-[20px] font-bold mb-3 text-[#699451] flex gap-[10px] justify-start items-center">
            <MdSubtitles className="mt-[3px]" />
            {post.title}
          </h2>
          <p className="text-gray-700 text-[14px] leading-relaxed flex justify-start items-center gap-[10px]">
            {post.description}
          </p>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[500px] object-cover rounded-lg mb-6 mt-[15px]"
            />
          )}
        </div>

        <div className="flex-col">
          <div className="w-[80vw] mx-auto lg:w-[426px] mt-[50px] lg:mt-[0px] bg-gray-50 shadow-md rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Seller Details
              </h3>
              <div className="flex items-center gap-3 mb-6">
                {sellerAvatar ? (
                  <img
                    src={sellerAvatar}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#699451]"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#699451] flex items-center justify-center text-white font-bold text-xl">
                    {sellerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{sellerName}</p>
                  <p className="text-sm text-gray-500">Role: Seller</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                Price:{" "}
                <span className="text-[#699451] text-xl font-bold">
                  ₹{post.price}
                </span>
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Category: {post.category}
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Address: {post.address || "Not provided"}
              </p>
            </div>

            <button
              onClick={() => setShowPopup(true)}
              className="w-full mt-6 bg-[#699451] text-white py-3 rounded-lg font-semibold hover:bg-[#587b3f] transition duration-200"
            >
              Buy Now
            </button>

            {authUser?.address && post.address && (
              <button
                onClick={() => {
                  const origin = encodeURIComponent(authUser.address);
                  const destination = encodeURIComponent(post.address);
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`,
                    "_blank"
                  );
                }}
                className="w-full bg-[#699451] mt-[10px] flex justify-center items-center gap-[8px] text-white py-3 rounded-lg font-semibold hover:bg-[#587b3f] transition duration-200"
              >
                <FaLocationCrosshairs className="mt-[1px]" />
                Geolocate on Maps
              </button>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Purchase
            </h2>

            {!loadingPurchase && !showOtpStep && (
              <>
                <p className="text-sm text-gray-600 mb-6">
                  A 2FA verification is required to confirm this payment.
                </p>
                <button
                  onClick={() => {
                    const generatedOtp = Math.floor(
                      100000 + Math.random() * 900000
                    );
                    setGeneratedOtp(generatedOtp);
                    setShowOtpStep(true);
                    alert(`Your OTP is: ${generatedOtp}`);
                  }}
                  className="w-full bg-[#699451] text-white py-3 rounded-lg font-semibold hover:bg-[#587b3f] transition duration-200"
                >
                  Send OTP
                </button>
              </>
            )}

            {showOtpStep && (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the 6-digit OTP sent to your registered email.
                </p>
                <input
                  type="number"
                  maxLength="6"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 text-center tracking-widest text-lg font-semibold"
                  placeholder="Enter OTP"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (parseInt(enteredOtp) === generatedOtp) {
                        handlePurchase();
                      } else {
                        alert("Invalid OTP. Please try again.");
                      }
                    }}
                    disabled={loadingPurchase}
                    className="px-4 py-2 bg-[#699451] text-white rounded-md hover:bg-[#587b3f]"
                  >
                    {loadingPurchase ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
