import React, { useEffect, useState } from 'react';

import Content from '../Content/Content';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
import Navbar from '../navbar/Navbar';

const updatePfp = async (id, pfp) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_RENDER_LINK}/api/data/update/pfp/${id}`, { 'pfp': pfp });
        console.log('Response:', response);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

const postUser = async (id,emailId,fullName) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_RENDER_LINK}/api/data/create/user`, { 'userId': id , 'emailId' : emailId , 'fullName' : fullName});
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false; 
    }
};

const LandingPage = () => {

    const { user } = useClerk();
    const { fullName, imageUrl, id } = user || {};
    const emailId = user ? user.primaryEmailAddress['emailAddress'] : ' '
    const [pfp, setPfp] = useState(localStorage.getItem('pfp') || '');

    useEffect(() => {

      const userLogin = async (id) => {
          if (user) {
              const response = await postUser(id,emailId,fullName);
          }
      };
  
      userLogin(id);
  }, [id]);

    useEffect(() => {
        const handlePfpChange = async () => {
            if (imageUrl && imageUrl !== pfp) {
                const updated = await updatePfp(id, imageUrl);
                if (updated) {
                    setPfp(imageUrl);
                    localStorage.setItem('pfp', imageUrl);
                } else {
                    toast.error('Failed to update profile picture.');
                }
            }
        };

        handlePfpChange();
    }, [pfp, fullName]);

    return (
        <div className=''>
            <Navbar />
            <Content />
            {/* <Footer /> */}
        </div>
    );
};

export default LandingPage;
