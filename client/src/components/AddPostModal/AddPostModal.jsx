import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';

const AddPostModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]); // State to hold images
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null); // State to track hovered image

  // Function to handle mouse enter event
  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  // Function to handle image removal
  const handleRemoveImage = (index) => {
    // Create a new array with images excluding the one to be removed
    const updatedImages = images.filter((image, i) => i !== index);
    // Update the state with the new array of images
    setImages(updatedImages);
  };

  const onDrop = (acceptedFiles) => {
    setImages(prevImages => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

  const onSubmit = (data) => {
    // Handle form submission here
    toast.success('Form submitted successfully!');
    console.log(images)
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
            {...register("title", { required: true, minLength: 5, maxLength: 30 })}
          />
          {errors.title && errors.title.type === 'required' && (
            <p className="text-red-500 mt-1">Title is required</p>
          )}
          {errors.title && errors.title.type === 'minLength' && (
            <p className="text-red-500 mt-1">Title must be at least 5 characters</p>
          )}
          {errors.title && errors.title.type === 'maxLength' && (
            <p className="text-red-500 mt-1">Title must be less than 30 characters</p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            className="w-full bg-[#181818] rounded px-4 py-2 focus:outline-none focus:border-blue-400 text-white"
            {...register("description", { required: true, minLength: 15, maxLength: 400 })}
          />
          {errors.description && errors.description.type === 'required' && (
            <p className="text-red-500 mt-1">Description is required</p>
          )}
          {errors.description && errors.description.type === 'minLength' && (
            <p className="text-red-500 mt-1">Description must be at least 15 characters</p>
          )}
          {errors.description && errors.description.type === 'maxLength' && (
            <p className="text-red-500 mt-1">Description must be less than 40 characters</p>
          )}
        </div>

        {/* Image Dropzone */}
        <div>
          <div {...getRootProps()} className="w-full border border-dashed border-gray-600 rounded-lg px-4 py-8 text-center cursor-pointer max-h-96">
            <input {...getInputProps()} />
            <div className="w-full grid grid-cols-4 justify-between items-center gap-3">
              {images.slice(0, 10).map((file, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={URL.createObjectURL(file)} alt="Dropped" className="max-w-full max-h-24" />
                  {hoveredImageIndex === index && (
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center "
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              {images.length > 10 && (
                <p className="text-white">+ {images.length - 10} more</p>
              )}
            </div>
            {images.length === 0 && (
              <p className="text-white">Drag & Drop your image(s) here or click to upload</p>
            )}
          </div>
          {images.length > 10 && (
            <p className="text-red-500">You can only add up to 10 images</p>
          )}
        </div>





        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-bl from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
    <ToastContainer />
   </>
  );
};

export default AddPostModal;
