import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing-Page/LandingPage';
import CommunityPage from '../Community/CommunityPage';
import PricingPage from '../Pricing/PricingPage';
import SavedPage from '../Saved/SavedPage';
import PostPage from '../Post-Page/PostPage';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/community' element={<CommunityPage />} />
      <Route path='/pricing' element={<PricingPage />} />
      <Route path='/saved' element={<SavedPage />} />
    </Routes>
  );
}

export default RoutesPage;
