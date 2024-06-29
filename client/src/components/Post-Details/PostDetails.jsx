import axios from "axios";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../../index.css";

import { ToastContainer, toast } from "react-toastify";

import { Link, useNavigate, useParams } from "react-router-dom";
import likeIcon from "../../assets/like-icon.svg";
import likedIcon from "../../assets/liked-icon.svg";
import shareIcon from "../../assets/share-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";
import saveIcon from "../../assets/saveFocused-icon.svg";
import savedIcon from "../../assets/saved-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import copyIcon from "../../assets/copy-icon.svg";
// import likeIcon from '../../assets/like-icon.svg'

import { useClerk } from "@clerk/clerk-react";
import { saveData, deleteData } from "../saveData";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WeiboShareButton,
  WeiboIcon,
} from "react-share";

import { FacebookShareCount, RedditShareCount } from "react-share";
import { deleteLikeData, likeData } from "../likeData";

const PostDetails = () => {
  const [datas, setData] = useState([]);
  const [bookmark, setBookmark] = useState(true);
  const [liked, setLiked] = useState(true);
  const [commentValue, setCommentValue] = useState("");
  const [imageData, setImageData] = useState([]);
  const { id } = useParams();
  const { user } = useClerk();
  const { id: userId } = user ? user : "";
  const { fullName:username } = user ? user : "";
  const { imageUrl:pfp } = user ? user : "";

  const shareUrl = window.location.href;

  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentable, setCommentable] = useState(true);
  let [likes, setLikes] = useState(0);

  const [processingComment, setProcessingComment] = useState(false);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2); // Extract last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const date = getCurrentDate();


  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openMoreModal = () => {
    setIsMoreOpen(true);
  };

  const closeMoreModal = () => {
    setIsMoreOpen(false);
  };

  const openCommentModal = () => {
    setIsCommentOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentOpen(false);
  };

  const handleUpdate = () => {
    navigate(`/update/${id}`, {state : datas})
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure");
    if (!confirm) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_RENDER_LINK}/api/data/deletePost/${id}`
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 1000,
        }); // Accessing response.data.message for success message
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Unknown Network Error");
      }
    } catch (error) {
      toast.error(`${error.message}`); // Accessing error.message directly for error message
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_RENDER_LINK}/api/data/postdetails/${id}`
        );
        setData(response.data);
        setImageData(response.data.data);
        setLikes(response.data.likes)
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const addComment = async (data) => {

    if (data.comment.length > 0)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RENDER_LINK}/api/data/comment/${id}`,
        { data }
      );
      setTimeout(() => {
        location.reload()
      }, 1000);
      toast.success("comment posted")
    } catch (err) {
      console.log(err);
    }
  };
  
  
  useEffect(() => {
    const savedDatas = JSON.parse(localStorage.getItem("savedDatas")) || [];
    
    const isSaved = savedDatas.includes(datas._id);
    
    setBookmark(isSaved);
  }, [datas._id]);

  useEffect(() => {
    const likedDatas = JSON.parse(localStorage.getItem("likedDatas")) || [];
    
    const isLiked = likedDatas.includes(datas._id);
    
    setLiked(isLiked);
  }, [datas._id]);
  
  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("copied url", {
      autoClose: 1000,
    });
  };
  
  const handleSaveToggle = () => {
    if (!user) {
      toast.error("Login to save post");
      return;
    }
    
    if (!bookmark) {
      saveData(datas._id, userId);
    } else {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove the saved post?"
      );
      if (!confirmDelete) return; // If user cancels, exit function
      
      deleteData(datas._id, userId);
    }

    setBookmark(!bookmark);
  };

  const handleLikeToggle = () => {
    if (!user) {
      toast.error("Login to like post");
      return;
    }
  
    if (!liked) {
      setLikes(likes + 1);
      likeData(datas._id, userId);
    } else {
      setLikes(likes - 1);
      deleteLikeData(datas._id, userId);
    }
  
    setLiked(!liked);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !processingComment) {
      setProcessingComment(true);
      const newCommentData = {
        userId: userId,
        username: username,
        comment: commentValue,
        date: date,
        pfp: pfp
      };
      if (!user) {
        toast.error("Login to add comment");
        return;
      }
      if (commentable) {
        await addComment(newCommentData);
      }
      commentable(false);
      setProcessingComment(false);
    }
  };
  
  return (
    <div className="h-full pt-4 px-8  bg-[#1e1e1e] rounded-lg">
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
        <img
          src={moreIcon}
          onClick={openMoreModal}
          className="cursor-pointer"
          alt="other"
        />
      </div>
      <div className=" w-full h-96 select-none cursor-pointer px-14 rounded-xl">
        <Swiper
          spaceBetween={30}
          loop={true}
          initialSlide={0} // Ensure the first image is in focus
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                '" style="background-color:white;"></span>'
              ); // Set the color of pagination dots to white
            },
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
      <div className="flex justify-between items-center w-full pt-6 pb-4">
        <div className="flex gap-6 w-3/6 items-start ">
          <div>
            <img className="cursor-pointer"
            onClick={handleLikeToggle}
            src={liked ? likedIcon  : likeIcon }
            alt="like" />
            <p className="text-center">{likes}</p>
          </div>
          <img
            className="cursor-pointer"
            onClick={openCommentModal}
            src={commentIcon}
            alt="comments"
          />
          <img
            className="cursor-pointer"
            src={shareIcon}
            onClick={openModal}
            alt="share"
          />
        </div>
        <img
          className="cursor-pointer"
          onClick={handleSaveToggle}
          src={bookmark ? savedIcon : saveIcon}
          alt="save"
        />
      </div>
      {/* description */}
      <p className="max-h-10 text-sm text-[#8d8d8d] space-x-50">
        {datas.description}
      </p>

      {/* Modal */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="modal-overlay fixed inset-0 bg-black opacity-80"></div>

            <div className="modal-container bg-[#181818] w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto text-black">
              {/* Modal content */}
              <div className="modal-content py-2 text-left px-2">
                <div className="flex justify-between items-center pb-3">
                  <div>
                    <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-xl font-semibold">
                      Share
                    </span>
                  </div>
                  <button
                    className="modal-close text-red-500 hover:text-red-700"
                    onClick={closeModal}
                  >
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 18 18"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.22 6.22a.75.75 0 0 1 1.06 0L9 7.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L10.06 9l1.72 1.72a.75.75 0 1 1-1.06 1.06L9 10.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L7.94 9 6.22 7.28a.75.75 0 0 1 0-1.06z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-x-4">
                  <img
                    className="hover:cursor-pointer"
                    onClick={copyURL}
                    src={copyIcon}
                  />
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon round={true} size={35} />
                  </WhatsappShareButton>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon round={true} size={35} />
                  </FacebookShareButton>
                  <TelegramShareButton url={shareUrl}>
                    <TelegramIcon round={true} size={35} />
                  </TelegramShareButton>
                  <EmailShareButton url={shareUrl}>
                    <EmailIcon round={true} size={35} />
                  </EmailShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon round={true} size={35} />
                  </TwitterShareButton>
                  <RedditShareButton url={shareUrl}>
                    <RedditIcon round={true} size={35} />
                  </RedditShareButton>
                  <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon round={true} size={35} />
                  </LinkedinShareButton>
                  <WeiboShareButton url={shareUrl}>
                    <WeiboIcon round={true} size={35} />
                  </WeiboShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMoreOpen && (
        <div className="absolute inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="modal-overlay fixed inset-0 bg-black opacity-80"></div>

            <div className="modal-container bg-[#181818] w-30 md:max-w-sm mx-auto rounded shadow-lg z-50 overflow-y-auto text-black">
              {/* Modal content */}
              <div className="modal-content py-2 text-left px-2 flex justify-between items-center">
                {/* Left section with buttons */}
                <div className="flex items-center gap-x-4">
                  {user && datas.userId === user.id && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  )}

                  {user && datas.userId === user.id && (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={handleDelete}
                    >
                      More
                    </button>


                {/* Right section with close button */}
                <button
                  className="modal-close text-red-500 hover:text-red-700"
                  onClick={closeMoreModal}
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 6.22a.75.75 0 0 1 1.06 0L9 7.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L10.06 9l1.72 1.72a.75.75 0 1 1-1.06 1.06L9 10.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L7.94 9 6.22 7.28a.75.75 0 0 1 0-1.06z"
                    ></path>
                  </svg>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCommentOpen && (
        <div className="fixed z-10 inset-0  flex items-center justify-center ">
        <div className="modal-overlay fixed inset-0 bg-black opacity-80"></div>

          <div className="modal-container bg-[#181818] w-full max-w-md mx-auto rounded-lg z-50 overflow-y-auto text-black">
            {/* Modal content */}
            <div className="modal-content py-6 text-left px-6 overflow-y-auto " style={{ maxHeight: "80vh" }}>
              <div className="flex justify-between items-center pb-3 ">
              <div>
                    <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-xl font-semibold">
                      Comments
                    </span>
                  </div>
                <button
                  className="modal-close text-red-500 hover:text-red-700"
                  onClick={closeCommentModal}
                >
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 6.22a.75.75 0 0 1 1.06 0L9 7.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L10.06 9l1.72 1.72a.75.75 0 1 1-1.06 1.06L9 10.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L7.94 9 6.22 7.28a.75.75 0 0 1 0-1.06z"
                    ></path>
                  </svg>
                </button>
              </div>
              <input 
                className="bg-[#1e1e1e] text-white outline-none rounded-md h-9 px-2 w-full" 
                onChange={(e) => { setCommentValue(e.target.value) }} 
                onKeyDown={handleKeyDown}
                placeholder="Add comment" 
              />

              <div className="flex flex-col items-start gap-y-5 px-2 mt-3">
                {datas &&
                  datas.comments &&
                  datas.comments.slice().reverse().map((comment, i) => {
                    return (
                        <div key={i} className=" flex flex-col gap-2 w-full">
                          <div className="flex items-center justify-between ">
                            <Link className="flex items-center gap-x-3" to=''>
                              <img className="w-6 h-6 rounded-full"  src={comment.pfp} alt="pfp"/>
                              <p style={{fontSize:"13px"}}  className="text-[#9ca3af]">{comment.username}</p>
                            </Link>
                          <p className=" text-[#434343]" style={{fontSize:"13px"}}>{comment.date}</p>
                          </div>
                          <p className="px-9 text-[#656565]" style={{fontSize:"13px"}}>{comment.comment}</p>
                        </div>
                      )
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default PostDetails;