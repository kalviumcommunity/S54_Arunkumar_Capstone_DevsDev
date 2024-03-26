import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing-Page/LandingPage';
import CommunityPage from '../Community/CommunityPage';
import PricingPage from '../Pricing/PricingPage';
import SavedPage from '../Saved/SavedPage';
import RegisterPage from '../Register/RegisterPage';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path='/' component={LandingPage} />
      <Route path='/community' component={CommunityPage} />
      <Route path='/pricing' component={PricingPage} />
      <Route path='/saved' component={SavedPage} />
      <Route path='/register' component={RegisterPage}/>
      {/* <Route path='*' component={} /> */}
    </Routes>
  );
}

export default RoutesPage;
