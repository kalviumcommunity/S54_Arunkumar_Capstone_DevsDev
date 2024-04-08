import React, { useEffect, useState } from 'react' ;
import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';
import RoutesPage from '../Routes/RoutesPage';
import Footer from '../Footer/Footer';

import axios from 'axios'
 
import {useClerk} from '@clerk/clerk-react'


const LandingPage = () => {

  const { user } = useClerk();
  const { username } = user ? user : '';
  const [pfp, setPfp] = useState(localStorage.getItem('imageUrl') || '');

  useEffect(() => {
    if (user && user.imageUrl && user.imageUrl !== pfp) {


      const handlePfpChange = async (event) => {
    
        try {
          const response = await axios.put(`${import.meta.env.VITE_RENDER_LINK}/api/data/update/pfp`,{ 'pfp': user.imageUrl ,'username':username } );
          console.log('Response:', response.data);

        } catch (error) {
          console.error('Error:', error);
          // Handle error (e.g., show error message)
        }
      };
      
      // localStorage.setItem('imageUrl', user.imageUrl);
      setPfp(user.imageUrl);
      handlePfpChange()

    }
  }, [user, pfp]);




  return (
     <>
      <Navbar />
      <Content />
      {/* <Footer /> */}
     </>
  )
}

export default LandingPage