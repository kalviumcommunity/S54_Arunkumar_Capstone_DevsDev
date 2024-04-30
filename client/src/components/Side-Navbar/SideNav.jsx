import React, { useState, useEffect } from 'react';
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
import faqsFocusedIcon from '../../assets/faqsFocused-icon.svg';
import helpIcon from '../../assets/help-icon.svg';
import helpFocusedIcon from '../../assets/helpFocused-icon.svg';

const SideNav = () => {
    const [focusedOption, setFocusedOption] = useState(0);

    // Define navigation options
    const navOptions = [
        {
            name: "Home",
            icon: homeIcon,
            focusedIcon: homeFocusedIcon,
            path: "/",
            key: 1,
        },
        // {
        //     name: "Community",
        //     icon: communityIcon,
        //     focusedIcon: communityFocusedIcon,
        //     path: "/community",
        //     key: 2,
        // },
        // {
        //     name: "Pricing",
        //     icon: pricingIcon,
        //     focusedIcon: pricingFocusedIcon,
        //     path: "/pricing",
        //     key: 3,
        // },
        {
            name: "Saved",
            icon: saveIcon,
            focusedIcon: saveFocusedIcon,
            path: "/saved",
            key: 4,
        },
        {
            name: "Help",
            icon: helpIcon,
            focusedIcon: helpFocusedIcon,
            path: "/help",
            key: 5,
        },
        {
            name: "FAQs",
            icon: faqsIcon,
            focusedIcon: faqsFocusedIcon,
            path: "/faqs",
            key: 6,
        }
    ];

    // Function to handle click on navigation options
    const handleOptionClick = (index) => {
        setFocusedOption(index); // Update focusedOption with the clicked index
        localStorage.setItem('focusedOption', index); // Store the focused option index in local storage
    };

    useEffect(() => {
        // On component mount, check if there's a focused option in local storage
        const storedIndex = localStorage.getItem('focusedOption');
        if (storedIndex !== null) {
            setFocusedOption(parseInt(storedIndex)); // Set the stored focused option index
        }
    }, []); // Run only once on component mount

    return (
        <div className='h-full flex flex-col justify-between'>
            <div className="w-full flex flex-col">
                {navOptions.map((option, index) => {
                    if (option.name === "Gap") {
                        return <div key={option.key} className="w-full mt-60"></div>; // Empty div for the gap
                    } else {
                        return (
                            <Link key={option.key} to={option.path} onClick={() => handleOptionClick(index)}>
                                <div className={`flex justify-center items-center gap-8 px-6 py-4 rounded-xl ${focusedOption === index ? 'bg-[#1e1e1e]' : ''}`} >
                                    <img src={focusedOption === index ? option.focusedIcon : option.icon} alt={option.name} />
                                    <span className="w-full">{option.name}</span>
                                </div>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default SideNav;
