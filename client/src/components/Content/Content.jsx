import React from 'react'
import SideNav from '../Side-Navbar/SideNav'
import PostPage from '../Post-Page/PostPage'
import RightDiv from '../RightDiv/RightDiv'
import RoutesPage from '../Routes/RoutesPage'

const Content = () => {
  return (
    <div className="grid grid-cols-6 borderGradientNav">

        <div className="col-span-1 h-screen px-6 py-14 pb-24">
        
            <SideNav />

        </div>

        <div className="col-span-4 h-screen py-14 px-20 overflow-hidden borderGradient">
          <RoutesPage />
        </div>

        <div className="col-span-1 h-screen  px-6 py-14">
        
          <RightDiv />

        </div>
    </div>  
  )
}

export default Content