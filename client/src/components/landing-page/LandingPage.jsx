import React from 'react' ;
import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';
import RoutesPage from '../Routes/RoutesPage';

const LandingPage = () => {
  return (
     <>
      <Navbar />
      <Content />
      <RoutesPage />
     </>
  )
}

export default LandingPage