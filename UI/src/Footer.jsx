import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <section id="footer">
        <div className="company">
          <Link to="/about"> About us </Link>
        </div>
        <div className="more_info">
          <h1>Privacy</h1>
        </div>

        <div className="more_info">
          <h1>Terms</h1>
        </div>

        <div className="more_info">
          <h1>Contact Us</h1>
        </div>

        <div className="more_info">
          <h1>@copyright CollegeConnect</h1>
        </div>

        <div className="social_media">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
      </section>
    </footer>
  );
}
