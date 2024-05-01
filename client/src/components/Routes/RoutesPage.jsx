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
import Faqs from '../Faqs/Faqs';
import UpdateForm from '../Update-Modal/UpdateForm';
import SearchResult from '../Search-result/SearchResult';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path='/' element={<PostPage />} />
      <Route path='/addpost' element={<AddPostModal />} />
      <Route path='/community' element={<CommunityPage />} />
      <Route path='/pricing' element={<PricingPage />} />
      <Route path='/saved' element={<SavedPage />} />
      <Route path='/update/:id' element={<UpdateForm />} />
      <Route path='/postdetails/:id' element={<PostDetails />} />
      <Route path='/signin' element={<SignInComp />} />
      <Route path='/signup' element={<SignUpComp />} />
      <Route path='/search-result/*' element={<SearchResult  />} exact />
      <Route path='/faqs' element={<Faqs />} />
    </Routes>
  );
}

export default RoutesPage;