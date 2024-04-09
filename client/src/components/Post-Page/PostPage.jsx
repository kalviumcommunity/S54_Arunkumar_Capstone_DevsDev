import React from 'react'
import addIcon from '../../assets/add-icon.svg'
import AllPosts from '../All-Posts/AllPosts'
import { Link } from 'react-router-dom'
import {useClerk} from '@clerk/clerk-react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'

const PostPage = () => {

  const {user} = useClerk();

  const [cookies, setCookie, removeCookie] = useCookies();

  const getCookie = (cookieName) => {
    return cookies[cookieName];
  };

  const userCookie = getCookie('__client_uat');
  
  const nagivate = useNavigate();
  const handleImageClick= () => {
    {userCookie && userCookie ? nagivate('/addpost') : toast.error("Login to add Post") }
  }

  return (
    <>
      <div className="flex justify-between items-center pb-4">

        <div>
          <span className=" bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-2xl font-semibold">Posts</span>
        </div>
        <img onClick={handleImageClick} className="cursor-pointer" src={addIcon} />
      </div>
      <AllPosts />
      <ToastContainer />
    </>
  )
}

export default PostPage