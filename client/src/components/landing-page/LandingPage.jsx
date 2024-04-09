import React, { useEffect, useState } from 'react' ;
import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';
import RoutesPage from '../Routes/RoutesPage';
import Footer from '../Footer/Footer';
import {toast} from 'react-toastify'

import axios from 'axios'
 
import {useClerk} from '@clerk/clerk-react'

const updatePfp = async(username, pfp) => {
  try {
      const response = await axios.patch(`${import.meta.env.VITE_RENDER_LINK}/api/data/update/pfp/${username}`, { 'pfp': pfp });
      console.log('Response:', response);
      return true; // Indicate successful update
  } catch (error) {
      console.error('Error:', error);
      return false; // Indicate update failed
  }
}

const LandingPage = () => {

    const { user } = useClerk();
    const { username, imageUrl } = user || {};
    const [pfp, setPfp] = useState(localStorage.getItem('pfp') || '');

    useEffect(() => {

        const handlePfpChange = async () => {
          if (imageUrl && imageUrl !== pfp) {
            const updated = await updatePfp(username, imageUrl);
            if (updated) {
              setPfp(imageUrl); // Update pfp state if update successful
              localStorage.setItem('pfp', imageUrl); // Store the updated pfp in local storage
              }
            }
        };

        handlePfpChange(); // Call handlePfpChange initially
    }, [imageUrl]);


  return (
     <>
      <Navbar />
      <Content />
      {/* <Footer /> */}
     </>
  )
}

export default LandingPage