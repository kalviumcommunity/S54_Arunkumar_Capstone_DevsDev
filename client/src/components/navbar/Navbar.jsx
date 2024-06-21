import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import axios from 'axios'

const Navbar = () => {
  const handleSignOut = () => {
    console.log("Sign out clicked");
    // Clear the likedProducts variable
    localStorage.removeItem("likedProducts");
  };

  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate()

  const handleSearch = async () => {

    try {

      const response = await axios.get(`${import.meta.env.VITE_RENDER_LINK}/api/data/search?query=${searchTerm}`);
      const data = response.data 

      navigate(`/search-result/${searchTerm}` , {state : data});



    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.length > 0)
      handleSearch();
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap py-4 px-12 w-full borderGradientNav">
      <div className="hover:cursor-default">
        <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-2xl font-semibold">
          Dev'sDev
        </span>
      </div>

      <div className="w-4/12 px-2 rounded-xl gradient-border outline-none bg-[#1e1e1e]">
      <input
        className="w-full p-2 rounded-xl border-none outline-none bg-transparent"
        placeholder="search"
        style={{ caretColor: "white" }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>

      <header>
        <SignedOut>
          <div>
            <Link to="/signup">
              <button className="px-4 py-2 borderGradientButton">
                <span className="bg-gradient-to-r from-[#923CFF] to-[#FE5F6E] text-transparent bg-clip-text">
                  Signup
                </span>
              </button>
            </Link>
            <Link to="/signin">
              <button className="px-4 py-2 borderGradientButton">
                <span className="bg-gradient-to-r from-[#923CFF] to-[#FE5F6E] text-transparent bg-clip-text">
                  Login
                </span>
              </button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            onSignOut={handleSignOut}
          ></UserButton>
        </SignedIn>
      </header>
    </nav>
  );
};

export default Navbar;
