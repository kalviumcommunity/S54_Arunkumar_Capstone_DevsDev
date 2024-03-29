import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing-Page/LandingPage';
import CommunityPage from '../Community/CommunityPage';
import PricingPage from '../Pricing/PricingPage';
import SavedPage from '../Saved/SavedPage';
import PostPage from '../Post-Page/PostPage';
import AddPostModal from '../AddPostModal/AddPostModal';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/addpost' element={<AddPostModal />} />
      <Route path='/community' element={<CommunityPage />} />
      <Route path='/pricing' element={<PricingPage />} />
      <Route path='/saved' element={<SavedPage />} />
    </Routes>
  );
}

export default RoutesPage;
