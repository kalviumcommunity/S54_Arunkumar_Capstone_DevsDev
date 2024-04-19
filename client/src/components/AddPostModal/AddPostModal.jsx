import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { addToCloudinary } from "../addToCloudinary";

import { useClerk } from "@clerk/clerk-react";
import axios from "axios";

const AddPostModal = () => {
  const { user } = useClerk();
  console.log('user: ', user);
  const userId = user ? user.id : "";
  const username = user ? user.fullName : "";
  console.log('userId: ', userId);  
  const pfp = user ? user.imageUrl : "";


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const [images, setImages] = useState([]);

  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [upload, setUpload] = useState(false);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2); // Extract last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const date = getCurrentDate();

  const communities = [
    { value: "amazon", label: "Amazon" },
    { value: "apple", label: "Apple" },
    { value: "appleMusic", label: "Apple Music" },
    { value: "behance", label: "Behance" },
    { value: "discord", label: "Discord" },
    { value: "facebook", label: "Facebook" },
    { value: "figma", label: "Figma" },
    { value: "github", label: "GitHub" },
    { value: "google", label: "Google" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "microsoft", label: "Microsoft" },
    { value: "netflix", label: "Netflix" },
    { value: "picasa", label: "Picasa" },
    { value: "pinterest", label: "Pinterest" },
    { value: "reddit", label: "Reddit" },
    { value: "skype", label: "Skype" },
    { value: "snapchat", label: "Snapchat" },
    { value: "spotify", label: "Spotify" },
    { value: "steam", label: "Steam" },
    { value: "tiktok", label: "TikTok" },
    { value: "twitch", label: "Twitch" },
    { value: "twitter", label: "Twitter" },
    { value: "vimeo", label: "Vimeo" },
    { value: "vine", label: "Vine" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "wordpress", label: "WordPress" },
    { value: "youtube", label: "YouTube" },
    { value: "other", label: "Other" },
  ];

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  // Function to handle image removal
  const handleRemoveImage = (index,e) => {
    e.stopPropagation()
    e.preventDefault()
    const updatedImages = images.filter((image, i) => i !== index);
    setImages(updatedImages);
  };

  const onDrop = (acceptedFiles) => {
    // Filter out non-image files
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    // Check if any non-image files were uploaded
    const nonImageFiles = acceptedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (nonImageFiles.length > 0) {
      toast.error("Only images are allowed.");
    }

    // Store dropped image files in the state
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const onSubmit = async (formData,e) => {

    e.preventDefault()

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    if (images.length > 10) {
      toast.error("Please upload max 10 image.");
      return;
    }

    setUpload(true); // Set upload state to true while uploading

    const data = await addToCloudinary(images);
    // console.log('imageData: ', data);

    formData.data = data;
    formData.userId = userId;
    formData.username = username;
    formData.pfp = pfp;
    formData.date = date;

    // console.log('Form data with cloudinaryImageData:', formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER_LINK}/api/data/create`,
        formData
      );
      console.log('Response:', response.data);

      toast.success(response.data.message);

      setUpload(false);
      
      reset();
      setImages([]);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      
    } catch (error) {
      setUpload(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full bg-[#1E1E1E] rounded-lg shadow-lg py-6 px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="w-full rounded px-4 py-2 focus:outline-none bg-[#181818] focus:border-blue-200 text-white"
              {...register("title", {
                required: true,
                minLength: 5,
                maxLength: 30,
              })}
            />

            {errors.title && errors.title.type === "required" && (
              <p className="text-red-500 mt-1">Title is required</p>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <p className="text-red-500 mt-1">
                Title must be at least 5 characters
              </p>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <p className="text-red-500 mt-1">
                Title must be less than 30 characters
              </p>
            )}
          </div>

          <div className="mb-4">
            <Controller
              name="community"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a community" }} // Add a validation rule for required selection
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full rounded px-4 py-2 focus:outline-none bg-[#181818] focus:border-blue-200 text-white ${
                    errors.community ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled hidden>
                    Select a community
                  </option>
                  {/* Render other options */}
                  {communities.map((community) => (
                    <option
                      className="py-1"
                      key={community.value}
                      value={community.value}
                    >
                      {community.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.community && (
              <p className="text-red-500 mt-1">{errors.community.message}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="w-full bg-[#181818] rounded px-4 py-2 focus:outline-none focus:border-blue-400 text-white h-32 resize-none"
              {...register("description", {
                required: true,
                minLength: 15,
                maxLength: 400,
              })}
            />

            {errors.description && errors.description.type === "required" && (
              <p className="text-red-500 mt-1">Description is required</p>
            )}
            {errors.description && errors.description.type === "minLength" && (
              <p className="text-red-500 mt-1">
                Description must be at least 15 characters
              </p>
            )}
            {errors.description && errors.description.type === "maxLength" && (
              <p className="text-red-500 mt-1">
                Description must be less than 400 characters
              </p>
            )}
          </div>

          <div>
            <div
              {...getRootProps()}
              className="w-full border border-dashed border-gray-600 rounded-lg px-4 py-8 text-center cursor-pointer max-h-full"
            >
              <input {...getInputProps()} />
              <div className="w-full grid grid-cols-4 justify-between items-center gap-3">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Dropped"
                      className="w-44 max-w-full  max-h-24"
                    />
                    {hoveredImageIndex === index && (
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
                        onClick={(e) => handleRemoveImage(index, e)}
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {images.length === 0 && (
                <p className="text-white">
                  Drag & Drop your image(s) here or click to upload
                </p>
              )}
            </div>
            {images.length > 10 && (
              <p className="text-red-500">You can only add up to 10 images</p>
            )}
          </div>

          <button
            type="submit"
            disabled={upload}
            className={`w-full mt-4 bg-gradient-to-bl ${
              upload ? "bg-gray" : "from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF]"
            }  text-white font-bold py-2 px-4 rounded focus:outline-none`}
          >
            {upload ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddPostModal;
