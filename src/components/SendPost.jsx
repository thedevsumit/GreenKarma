import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MdNavigateNext, MdArrowBackIos } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { usePostStore } from "../store/usePostStore";
import { X, Loader2 } from "lucide-react";
import { aiConvert } from "../lib/ai";

const SendPost = () => {
  const { authUser, role } = useAuthStore();
  const initial = authUser.fullName
    ? authUser.fullName.charAt(0).toUpperCase()
    : "?";

  const { postingData } = usePostStore();

  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    setStep(0);
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFormSubmit = async () => {
    try {
      setIsPosting(true);

      const formData = {
        title,
        description,
        price,
        category,
        role,
        image: imagePreview,
        username: authUser.fullName,
        avatar: authUser.profilePic,
        address: authUser.address,
      };

      const updatedDesc = await aiConvert(formData);

      const newFormData = {
        ...formData,
        description: updatedDesc,
      };

      await postingData(newFormData);
      setIsPosting(false);
      setShowSuccessModal(true);
      handleClose();
    } catch (error) {
      console.error(error);
      setIsPosting(false);
      alert("Something went wrong while posting!");
    }
  };

  return (
    <>
      <div className="w-[80vw] lg:w-[555px] mx-auto space-y-6 relative top-33">
        <div className="lg:w-[555px] h-[86px] m-auto bg-white rounded-[15px] py-[10px]">
          <div className="flex gap-[10px] p-[8px]">
            <div>
              {authUser.profilePic && authUser.profilePic.trim() !== "" ? (
                <img
                  src={authUser.profilePic}
                  alt="Profile"
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[48px] h-[48px] rounded-full bg-[#699451] flex items-center justify-center text-white font-bold">
                  {initial}
                </div>
              )}
            </div>
            <div
              className="w-[90%] lg:w-[467px] h-[48px] flex justify-start items-center border-gray-500 border-[0.1px] p-[14px] rounded-[30px] cursor-pointer"
              onClick={() => setStep(1)}
            >
              Create a Post
            </div>
          </div>
        </div>
      </div>

      {step > 0 && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[744px] min-h-[241px] relative">
            <div className="flex items-center gap-4 mb-4">
              {authUser.profilePic && authUser.profilePic.trim() !== "" ? (
                <img
                  src={authUser.profilePic}
                  alt="Profile"
                  className="w-[56px] h-[56px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[56px] h-[56px] rounded-full bg-[#699451] flex items-center justify-center text-white font-bold">
                  {initial}
                </div>
              )}
              <div>
                <p className="text-[20px] font-medium">{authUser.fullName}</p>
                <p className="text-[14px]">Post as {role}</p>
              </div>
            </div>

            {step === 1 && (
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you want to sell today?"
                className="w-full h-[60px] border-none text-[20px] text-black placeholder-gray-500 focus:outline-none resize-none"
              />
            )}
            {step === 2 && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description"
                className="w-full h-[100px] border-none text-[20px] text-black placeholder-gray-500 focus:outline-none resize-none"
              />
            )}
            {step === 3 && (
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full h-[50px] border-none text-[20px] text-black placeholder-gray-500 focus:outline-none resize-none"
              />
            )}
            {step === 4 && (
              <div>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category"
                  className="w-full h-[50px] border-none text-[20px] text-black placeholder-gray-500 focus:outline-none resize-none"
                />

                {imagePreview && (
                  <div className="mt-3 relative w-24 h-24">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <label
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex items-center justify-center w-10 h-10 border-2 border-dashed border-gray-400 rounded-full cursor-pointer"
                >
                  <FaImage />
                </label>

                <button
                  onClick={handleFormSubmit}
                  className="mt-6 px-6 py-2 bg-[#699451] text-white rounded-lg"
                >
                  Post
                </button>
                <button
                  onClick={handleClose}
                  className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}

            <div className="flex justify-end mt-6">
              {step < 4 && (
                <div className="flex">
                  <MdArrowBackIos
                    className="w-[25px] h-[40px] cursor-pointer"
                    onClick={() => setStep((p) => Math.max(p - 1, 1))}
                  />
                  <MdNavigateNext
                    className="w-[40px] h-[40px] cursor-pointer"
                    onClick={() => setStep((p) => Math.min(p + 1, 4))}
                  />
                </div>
              )}
              {step < 4 && (
                <button
                  onClick={handleClose}
                  className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>

            {isPosting && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                <Loader2 className="w-10 h-10 text-[#699451] animate-spin" />
                <p className="ml-3 text-[#699451] font-semibold">
                  Posting your item...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-[#699451] mb-3">
              🎉 Post Uploaded!
            </h2>
            <p className="text-gray-700">
              Your post was successfully uploaded and you earned
              <span className="font-bold text-[#699451]"> +25 points</span> 🎁
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 px-6 py-2 bg-[#699451] text-white rounded-lg hover:bg-[#587b3f]"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SendPost;
