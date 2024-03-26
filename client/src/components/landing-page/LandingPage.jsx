import React from 'react' ;
import Navbar from '../Navbar/Navbar';
import Content from '../Content/Content';
import RoutesPage from '../Routes/RoutesPage';
import Footer from '../Footer/Footer';


const LandingPage = () => {
  return (
     <>
      <Navbar />
      <Content />
      <Footer />
      <RoutesPage />
     </>
  )
}

export default LandingPage