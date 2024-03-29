import React from 'react'
import addIcon from '../../assets/add-icon.svg'
import AllPosts from '../All-Posts/AllPosts'

const PostPage = () => {
  return (
    <>
      <div className="flex justify-between items-center pb-4">

        <div>
          <span className=" bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-2xl font-semibold">Posts</span>
        </div>
        <img className="cursor-pointer" src={addIcon} />

      </div>
      <AllPosts />
    </>
  )
}

export default PostPage