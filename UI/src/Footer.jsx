import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (
        <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">CollegeConnect Verified</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Lite Version</a></li>
              <li><a href="#">Hashtags</a></li>
              <li><a href="#">Language</a></li>
            </ul>
            <div className="footer-social">
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
          </div>
          </div>
          <div className="footer-bottom">
            <span>© 2023 CollegeConnect</span>
          </div>
        </div>
      </footer>
    )
}