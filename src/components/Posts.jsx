import React, { useEffect } from "react";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import { usePostStore } from "../store/usePostStore";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { fetchedData, fetchingData, whattoShow } = usePostStore();
  const navigate = useNavigate();
  console.log(whattoShow);
  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return (
    <div className="w-[555px] mx-auto mt-8 space-y-6 relative top-30">
      {fetchedData.length === 0 ? (
        <p className="text-center text-gray-500 italic">No posts yet</p>
      ) : (
        fetchedData.map((post) => {
          if (whattoShow === "Posts" || whattoShow === "Mylisted") {
            return (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 p-5 cursor-pointer"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <div className="flex items-center gap-3 mb-4 justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    {post.avatar ? (
                      <img
                        src={post.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-300"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#699451] flex items-center justify-center text-white font-bold text-lg border-2 border-[#699451] cursor-pointer">
                        {post.username?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-[20px]">
                        {post.username || "Anonymous"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-[#699451] w-[100px] h-[40px] rounded-[10px] flex justify-center items-center text-white cursor-pointer">
                      {post.category}
                    </div>

                    <div
                      className={`w-[100px] h-[40px] rounded-[10px] flex justify-center items-center text-white text-sm font-semibold ${
                        post.available ? "bg-[#699451]" : "bg-red-500"
                      }`}
                    >
                      {post.available ? "Available" : "Not Available"}
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4">{post.description}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full max-h-96 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex justify-around text-gray-600 text-sm border-t pt-2 mt-2">
                  <button className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200 font-medium">
                    <FaRegThumbsUp /> Like
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200 font-medium">
                    <FaRegCommentDots /> Comment
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 transition-colors duration-200 font-medium">
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            );
          }

          if (whattoShow === "Purchases") {
            return (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-all duration-200 flex gap-5"
              >
                <div className="w-[40%]">
                  {post.item?.image ? (
                    <img
                      src={post.item.image}
                      alt={post.item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {post.item?.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {post.item?.description?.slice(0, 100)}...
                    </p>
                    <p className="text-[#699451] font-extrabold">
                      ₹{post.amount}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="text-[#699451] font-extrabold">
                        {post.status}
                      </span>
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {post.paymentMethod}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          if (whattoShow === "Listed") {
            return (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition-all duration-200 flex gap-5"
              >
                <div className="w-[40%]">
                  {post.item?.image ? (
                    <img
                      src={post.item.image}
                      alt={post.item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {post.item?.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {post.item?.description?.slice(0, 100)}...
                    </p>
                    <p className="text-[#699451] font-extrabold">
                      ₹{post.amount}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="text-[#699451] font-extrabold">
                        {post.status}
                      </span>
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {post.paymentMethod}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

export default Posts;
