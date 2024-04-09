import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing-Page/LandingPage';
import CommunityPage from '../Community/CommunityPage';
import PricingPage from '../Pricing/PricingPage';
import SavedPage from '../Saved/SavedPage';
import PostPage from '../Post-Page/PostPage';
import AddPostModal from '../AddPostModal/AddPostModal';
import PostDetails from '../Post-Details/PostDetails';
import SignInComp from '../sign-in/SignIn';
import SignUpComp from '../Sign-Up/SignUp';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/addpost' element={<AddPostModal />} />
      <Route path='/community' element={<CommunityPage />} />
      <Route path='/pricing' element={<PricingPage />} />
      <Route path='/saved' element={<SavedPage />} />
      <Route path='/postdetails/:id' element={<PostDetails />} />
      <Route path='/signin' element={<SignInComp />} />
      <Route path='/signup' element={<SignUpComp />} />
    </Routes>
  );
}

export default RoutesPage;
