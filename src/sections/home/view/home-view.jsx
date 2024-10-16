import React from 'react';

import Footer from 'src/components/footer';
import Header from 'src/components/header';

import Banner from '../newbanner';
import TutorialVideo from '../tutorial';

const HomeView = () => (
  <>
    <Header />
    <Banner />
    <TutorialVideo />
    <Footer />
  </>
);

export default HomeView;
