import React from 'react'
import SideNav from '../Side-Navbar/SideNav'
import PostPage from '../Post-Page/PostPage'
import RightDiv from '../RightDiv/RightDiv'
import CenterDiv from '../Center-Div/CenterDiv'
import RoutesPage from '../Routes/RoutesPage'

const Content = () => {
  return (
    <div className="grid grid-cols-6">

        <div className="col-span-1 h-screen px-8 py-14 borderGradient">
        
            <SideNav />

        </div>

        <div className="col-span-4 py-14 px-16">

            <RoutesPage />

        </div>

        <div className="col-span-1 border-l h-screen borderGradient px-6 py-14">
        
          <RightDiv />

        </div>
    </div>  
  )
}

export default Content