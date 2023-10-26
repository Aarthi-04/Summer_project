import React from 'react';
import { Link } from 'react-router-dom';
import './style/homepage.css';


const HomeContent = () => {
  return (
    <div className="home-content">
      <h1>Surveillance Marked Object Detection</h1>
      <p>Welcome to our webpage dedicated to surveillance marked object detection! We specialize in advanced computer vision and deep learning techniques to identify and track marked objects within surveillance videos. Our cutting-edge technology aims to enhance security and situational awareness in various scenarios, from public spaces to private properties.</p>
      <Link to="/upload">
        <button>Proceed to Detection</button>
      </Link>
    </div>
  );
};

export default HomeContent;
