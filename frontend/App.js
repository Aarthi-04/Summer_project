import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomeContent from './components/home';
import AboutUs from './components/about';
import ContactUs from './components/contact';
import Footer from './components/Footer';
import './components/style/App.css';
import VideoUploadForm from './components/video';
const App = () => {
  return (
    <Router>
      <div className='container'>
        <div className="task-bar">
          <div className="navigation-links">
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/upload" element={<VideoUploadForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
