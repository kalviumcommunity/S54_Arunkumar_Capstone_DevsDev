import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {

  return (
    <div className="h-full pt-8 px-8">
        <div className="flex justify-between items-center pb-4">
                <Link to={''}>
                    <div className=" flex gap-4 ">
                        <img className="w-8 h-8 rounded-full" alt='userprofile'/>
                        <p className="text-sm self-center">username</p>
                    </div>
                </Link>
                <img alt='other'/>
        </div>
        <div className='h-4/6'>
            {/* image scroll */}

        </div>
        <div className="flex justify-between items-center w-full py-4">
            <div className="flex gap-6 w-3/6">
                <img className="cursor-pointer" alt='like'/>
                <img className="cursor-pointer" alt='comments'/>
                <img className="cursor-pointer" alt='share'/>
            </div>
            <img alt='save'/>
        </div>
        {/* description */}
        <p className="h-20 text-sm space-x-50">
            description
        </p>
    </div>
  )
}

export default PostDetails