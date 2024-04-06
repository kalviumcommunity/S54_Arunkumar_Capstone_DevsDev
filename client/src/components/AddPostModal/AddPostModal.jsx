import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { addToCloudinary } from '../addToCloudinary';

const AddPostModal = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [images, setImages] = useState([]); 
  // const [cloudinaryImageData, setCloudinaryImageData] = useState([]);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null); 
  const [upload, setUpload] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  // Function to handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((image, i) => i !== index);
    setImages(updatedImages);
  };

  const onDrop = (acceptedFiles) => {
    // Store dropped images in a variable
    setImages(prevImages => [...prevImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

  const onSubmit = async (formData) => {

    if (images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
    if (images.length > 10) {
      toast.error('Please upload max 10 image.');
      return;
    }
    
    setUpload(true); // Set upload state to true while uploading

    const imageData = await addToCloudinary(images);
    console.log('imageData: ', imageData);
  
    formData.imageData = imageData;

    console.log('Form data with cloudinaryImageData:', formData);

    setUpload(false); // Set upload state to false after uploading
    
    toast.success('Form submitted successfully!');
    reset(); // This will reset the form state
    setImages([]);
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
              className="w-full bg-[#181818] rounded px-4 py-2 focus:outline-none focus:border-blue-400 text-white h-32 resize-none"
              {...register("description", { required: true, minLength: 15, maxLength: 400 })}
            />

            {errors.description && errors.description.type === 'required' && (
              <p className="text-red-500 mt-1">Description is required</p>
            )}
            {errors.description && errors.description.type === 'minLength' && (
              <p className="text-red-500 mt-1">Description must be at least 15 characters</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p className="text-red-500 mt-1">Description must be less than 400 characters</p>
            )}
          </div>

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
            disabled={upload} // Disable submit button while uploading
            className={`w-full mt-4 bg-gradient-to-bl ${upload ? "bg-gray" : "from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF]"}  text-white font-bold py-2 px-4 rounded focus:outline-none`}
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
