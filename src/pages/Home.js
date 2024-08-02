import React from 'react';
import MuiImageSlider from 'mui-image-slider';

import image1 from '../assets/images/blood-test.jpg';
import image2 from '../assets/images/nethum-medilab.jpg';
import image3 from '../assets/images/staff-lab-medilab.jpg';
import image4 from '../assets/images/testing-blood.jpg';
import image5 from '../assets/images/sugarandbloodtestnethumedilab.jpg';
import { Container } from '@mui/material';


const images = [
  image2, image3, image4, image5, image1
];

function Home() {
  return (
    <Container>
      <h1>Home</h1>
      <MuiImageSlider alwaysShowArrows='true' autoPlay='true' images={images} />
    </Container>
  );
}

export default Home;