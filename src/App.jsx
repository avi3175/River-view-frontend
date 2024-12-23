import React from 'react';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import About from './components/About';
import Footer from './components/Footer';
import Rooms from './components/Rooms';

const App = () => {
  return (
    <div>
          <Navbar></Navbar>
          <About></About>
          <Slider></Slider>
          <Rooms></Rooms>
          <Footer></Footer>
          <h1>THIS IS WORKING</h1>
    </div>
  );
};

export default App;
