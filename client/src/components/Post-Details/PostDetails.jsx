import axios from "axios";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../index.css";

import { ToastContainer, toast } from "react-toastify";

import { Link, useParams } from "react-router-dom";
import likeIcon from "../../assets/like-icon.svg";
import likedIcon from "../../assets/liked-icon.svg";
import shareIcon from "../../assets/share-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import saveIcon from "../../assets/save-icon.svg";
import savedIcon from "../../assets/saved-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
// import likeIcon from '../../assets/like-icon.svg'

import { useClerk } from "@clerk/clerk-react";
import { saveData , deleteData } from "../saveData";

const PostDetails = () => {
  const [datas, setData] = useState([]);
  const [bookmark, setBookmark] = useState(true);
  const [imageData, setImageData] = useState([]);
  const { id } = useParams();
  const { user } = useClerk();
  const { id: userId } = user ? user : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/postdetails/${id}`
        );
        setData(response.data);
        setImageData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    const likedDatas = JSON.parse(localStorage.getItem("likedDatas")) || [];

    const isSaved = likedDatas.includes(datas._id);

    setBookmark(isSaved);
  }, [datas._id]);

  const handleSaveToggle = () => {
    if (!user) {
      toast.error('Login to save post');
      return;
    }
    
    if (!bookmark) {
      saveData(datas._id, userId);
    } else {
      const confirmDelete = window.confirm('Are you sure you want to remove the saved post?');
      if (!confirmDelete) return; // If user cancels, exit function
      
      deleteData(datas._id, userId);
    }
    
    setBookmark(!bookmark);
};

  return (
    <div className="h-full pt-4 px-8">
      <div className="flex justify-between items-center pb-4">
        <Link to={""}>
          <div className=" flex gap-4 ">
            <img
              className="w-8 h-8 rounded-full"
              src={datas.pfp}
              alt="userprofile"
            />
            <p className="text-sm self-center">{datas.username}</p>
          </div>
        </Link>
        <img src={moreIcon} className="cursor-pointer" alt="other" />
      </div>
      <div className=" w-full h-96 select-none cursor-pointer px-10">
        <Swiper
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {imageData &&
            imageData.map((res, i) => {
              return (
                <SwiperSlide key={i}>
                  {" "}
                  <img className="w-full rounded-xl h-96" src={res} />{" "}
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div className="flex justify-between items-center w-full py-4">
        <div className="flex gap-6 w-3/6">
          <img className="cursor-pointer" src={likeIcon} alt="like" />
          <img className="cursor-pointer" src={commentIcon} alt="comments" />
          <img className="cursor-pointer" src={shareIcon} alt="share" />
        </div>
        <img
          className="cursor-pointer"
          onClick={handleSaveToggle}
          src={bookmark ? savedIcon : saveIcon}
          alt="save"
        />
      </div>
      {/* description */}
      <p className="h-20 text-sm text-[#8d8d8d] space-x-50">
        {datas.description}
      </p>
      <ToastContainer />
    </div>
  );
};

export default PostDetails;
