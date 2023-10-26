import React, { useState } from 'react';
import './style/about.css';

const AboutUs = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prevDropdown) => (prevDropdown === dropdownName ? null : dropdownName));
  };

  return (
    <div className="about-us">
    
      <h2 className={activeDropdown === 'features' ? 'active' : ''} onClick={() => toggleDropdown('features')}>
        >> Key Features
      </h2>
      {activeDropdown === 'features' && (
        <ul>
          <li><p>ACCURATE DETECTION:</p> Our state-of-the-art algorithms ensure precise identification of marked objects, even in challenging conditions like low light or crowded scenes.</li>
          <li><p>REAL-TIME ANALYSIS:  </p> We understand the importance of real-time monitoring in surveillance. Our solutions are optimized to provide fast and efficient detection capabilities.</li>
          <li><p>SCALABLE SOLUTIONS:</p> Whether you require surveillance for a small area or an extensive network of cameras, our scalable solutions can adapt to your needs.</li>
          <li><p>CUSTOMIZATION:</p> We believe in tailoring our technology to fit specific requirements. Our team can work with you to customize the system according to your surveillance objectives.</li>
          <li><p>CONTINUOUS IMPROVEMENT:</p> We are committed to staying at the forefront of surveillance technology. Our team regularly updates and improves our algorithms to stay ahead of emerging challenges.</li>
        </ul>
      )}

      <h2 className={activeDropdown === 'useCases' ? 'active' : ''} onClick={() => toggleDropdown('useCases')}>
        >> Use Cases
      </h2>
      {activeDropdown === 'useCases' && (
        <ul>
          <li><p>SECURITY ENHANCEMENT:</p> Protect your premises from potential threats by identifying and tracking marked objects in real-time.</li>
          <li><p>LAW ENFORCEMENT SUPPORT:</p> Aid law enforcement agencies in investigations by providing crucial information through surveillance footage analysis.</li>
          <li><p>RETAIL LOSS PREVENTION:</p> Prevent theft and shoplifting by detecting marked items in retail environments.</li>
          <li><p>TRAFFIC MANAGEMENT:</p> Monitor traffic situations and identify marked vehicles for enhanced traffic management.</li>
          <li><p>PUBLIC SAFETY:</p> Improve public safety by spotting marked objects in public areas, events, and gatherings.</li>
        </ul>
      )}

      <h2 className={activeDropdown === 'whyChoose' ? 'active' : ''} onClick={() => toggleDropdown('whyChoose')}>
        >> Why Choose Us
      </h2>
      {activeDropdown === 'whyChoose' && (
        <ul>
          <li><p>EXPERTISE:</p> Our team consists of highly skilled computer vision experts with years of experience in the field.</li>
          <li><p>RELIABILITY:</p> Count on our solutions for accurate and dependable surveillance marked object detection.</li>
          <li><p>DATA PRIVACY:</p> We prioritize data security and ensure that your surveillance data remains private and protected.</li>
          <li><p>CUSTOMER SUPPORT:</p> Our dedicated support team is always available to assist you with any queries or technical issues.</li>
        </ul>
      )}
    </div>
  );
};

export default AboutUs;
