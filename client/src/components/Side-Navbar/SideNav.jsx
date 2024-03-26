import React from 'react'
import homeIcon from '../../assets/home-icon.svg';
import communityIcon from '../../assets/community-icon.svg';
import pricingIcon from '../../assets/pricing-icon.svg';
import savedIcon from '../../assets/saved-icon.svg';
import { Link } from 'react-router-dom';


const SideNav = () => {

    const navOptions = [
        {
            name:"Home",
            icon:homeIcon,
            path:"/",
            key:1,
        },
        {
            name:"Community",
            icon:communityIcon,
            path:"/community",
            key:2,
        },
        {
            name:"Pricing",
            icon:pricingIcon,
            path:"/pricing",
            key:3,
        },
        {
            name:"Saved",
            icon:savedIcon,
            path:"/saved",
            key:4,
        }
        ];

  return (
    <div className="w-full flex flex-col">
        {navOptions.map((option,i)=>
                
            <Link key={option.key} to={option.path}>
                <div className="flex justify-center items-center gap-8 px-6 py-4 optionHover" >
                    <img src={option.icon}/>
                    <span className="w-full">{option.name}</span>
                </div>
            </Link>
            
            )
        }
    </div>
  )
}

export default SideNav