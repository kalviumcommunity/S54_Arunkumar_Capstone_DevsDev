import axios from 'axios'
import React, { useEffect, useState ,useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '../../index.css';

import { Link, useParams } from 'react-router-dom'
import likeIcon from '../../assets/like-icon.svg'
import likedIcon from '../../assets/liked-icon.svg'
import shareIcon from '../../assets/share-icon.svg'
import commentIcon from '../../assets/comment-icon.svg'
import saveIcon from '../../assets/save-icon.svg'
import savedIcon from '../../assets/saved-icon.svg'
import moreIcon from '../../assets/more-icon.svg'
// import likeIcon from '../../assets/like-icon.svg'

const PostDetails = () => {

    const [datas,setData] = useState([])
    const [imageData,setImageData] = useState([])
    const {id} = useParams()
    // console.log(id)
    
    useEffect(()=>{
        
        const fetchData = async() => {
            try {
                // console.log("get request working")
                // console.log(`${import.meta.env.VITE_RENDER_LINK}/api/data`)
                const response = await axios.get(`${import.meta.env.VITE_RENDER_LINK}/api/data/postdetails/${id}`)
                setData(response.data)
                setImageData(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
        
    },[])

  return (
    <div className="h-full pt-4 px-8">
        <div className="flex justify-between items-center pb-4">
                <Link to={''}>
                    <div className=" flex gap-4 ">
                        <img className="w-8 h-8 rounded-full" src={datas.pfp} alt='userprofile'/>
                        <p className="text-sm self-center">{datas.username}</p>
                    </div>
                </Link>
                <img src={moreIcon} className="cursor-pointer" alt='other'/>
        </div>
        <div className=" w-full h-96 select-none cursor-pointer px-10">

        <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
                
            {imageData && imageData.map((res,i)=> {
                return (
                    <SwiperSlide key={i} > <img  className="w-full rounded-xl h-96" src={res} />  </SwiperSlide>
                )
            })}

        </Swiper>

        </div>
        <div className="flex justify-between items-center w-full py-4">
            <div className="flex gap-6 w-3/6">
                <img className="cursor-pointer" src={likeIcon} alt='like'/>
                <img className="cursor-pointer" src={commentIcon} alt='comments'/>
                <img className="cursor-pointer" src={shareIcon} alt='share'/>
            </div>
            <img className="cursor-pointer" src={saveIcon} alt='save'/>
        </div>
        {/* description */}
        <p className="h-20 text-sm text-[#8d8d8d] space-x-50">
            {datas.description}
        </p>
    </div>
  )
}

export default PostDetails

// <SwiperSlide>Slide 2</SwiperSlide>
