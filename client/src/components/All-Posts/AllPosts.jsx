import React, { useEffect } from 'react'
import nextIcon from '../../assets/next-icon.svg'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const AllPosts = () => {

    const id = useParams()

return (
    <div className="grid justify-center grid-cols-2 pt-4 w-full h-screen gap-8 p-2 pb-4 overflow-y-auto scrollBarNone" 
    style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        overflow: '-moz-scrollbars-none'
    }}>

    <div className="w-96 bg-[#1E1E1E] rounded-xl h-80 p-4 hover:cursor-pointer">
            <div className="w-full bg-[#181818] rounded-md h-48">
                <img />
            </div>
            <div className="flex flex-col justify-between h-24">
                <div className="flex justify-between items-end px-1">
                    <p className="text-xl text-[#d5d5d5] px-1 pt-2 ">youtube Thumbnail Dilemma</p>
                    <span className="textSmall  pr-1">23-04-06</span>
                </div>
                <div className="flex justify-between items-end px-1">  
                    <p className="text-sm textSmall px-1">Sak</p>
                    <Link to={`/postdetails/${id}`}>
                        <img className="h-12 hover:cursor-pointer flex self-end" src={nextIcon} />
                    </Link>
                </div>
            </div>
    </div>
    {}

    </div>

  )
}

export default AllPosts
