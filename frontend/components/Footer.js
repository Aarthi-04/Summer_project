import React from 'react';
import './style/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Surveillance detectors. All rights reserved.</p>
      <div className="social-links">
        <a href="https://twitter.com/surveillance_tech" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="lg" style={{ color: "#020a17" }} />
        </a>
        <a href="https://www.linkedin.com/company/surveillance-marked-detection" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} size="lg" style={{ color: "#020c1d" }} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
