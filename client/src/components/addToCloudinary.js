import axios from 'axios';

const addToCloudinary = async (images) => {
  try {
    const uploadedImages = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'user_image_datas');

      const response = await axios.post(import.meta.env.VITE_CLOUDINARY_LINK,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Ensure proper content type
          }
        }
      );

      // Check if the response contains the secure_url property
      if (response.data && response.data.secure_url) {
        uploadedImages.push(response.data.secure_url);
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }
    }
    
    console.log('Images uploaded to Cloudinary:', uploadedImages);
    return uploadedImages;

  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
};

export { addToCloudinary };
