import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/home-icon.svg';
import homeFocusedIcon from '../../assets/homeFocused-icon.svg';
import communityIcon from '../../assets/community-icon.svg';
import communityFocusedIcon from '../../assets/communityFocused-icon.svg';
import pricingIcon from '../../assets/pricing-icon.svg';
import pricingFocusedIcon from '../../assets/pricingFocused-icon.svg';
import saveIcon from '../../assets/save-icon.svg';
import saveFocusedIcon from '../../assets/saveFocused-icon.svg';
import faqsIcon from '../../assets/faqs-icon.svg';
import faqsFocusedIcon from '../../assets/faqsFocused-icon.svg'; // Import focused icon for FAQs
import helpIcon from '../../assets/help-icon.svg';
import helpFocusedIcon from '../../assets/helpFocused-icon.svg'; // Import focused icon for Help

const SideNav = () => {
    const [focusedOption, setFocusedOption] = useState(0);

    const navOptions = [
        {
            name: "Home",
            icon: homeIcon,
            focusedIcon: homeFocusedIcon,
            path: "/",
            key: 1,
        },
        {
            name: "Community",
            icon: communityIcon,
            focusedIcon: communityFocusedIcon,
            path: "/community",
            key: 2,
        },
        {
            name: "Pricing",
            icon: pricingIcon,
            focusedIcon: pricingFocusedIcon,
            path: "/pricing",
            key: 3,
        },
        {
            name: "Saved",
            icon: saveIcon,
            focusedIcon: saveFocusedIcon,
            path: "/saved",
            key: 4,
        }
    ];

    const handleOptionClick = (index) => {
        setFocusedOption(index); // Update focusedOption with the clicked index
    };

    return (
        <div className='h-full flex flex-col justify-between'>
            <div className="w-full flex flex-col">
                {navOptions.map((option, index) =>
                    <Link key={option.key} to={option.path} onClick={() => handleOptionClick(index)}>
                        <div className={`flex justify-center items-center gap-8 px-6 py-4 rounded-xl ${focusedOption === index ? 'bg-[#1e1e1e]' : ''}`} >
                            <img src={focusedOption === index ? option.focusedIcon : option.icon} />
                            <span className="w-full">{option.name}</span>
                        </div>
                    </Link>
                )}
            </div>
            <div className="flex flex-col">
                <Link to='/help' onClick={() => setFocusedOption('help')}>
                    <div className={`flex justify-center items-center gap-8 px-6 py-4 rounded-xl ${focusedOption === 'help' ? 'bg-[#1e1e1e]' : ''}`} >
                        <img src={focusedOption === 'help' ? helpFocusedIcon : helpIcon} />
                        <span className="w-full">Help</span>
                    </div>
                </Link>
                <Link to='/faqs' onClick={() => setFocusedOption('faqs')}>
                    <div className={`flex justify-center items-center gap-8 px-6 py-4 rounded-xl ${focusedOption === 'faqs' ? 'bg-[#1e1e1e]' : ''}`} >
                        <img src={focusedOption === 'faqs' ? faqsFocusedIcon : faqsIcon} />
                        <span className="w-full">FAQs</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideNav;
