import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <section id="footer">
        <div className="company footmargin">
          <Link to="/about"> About us </Link>
        </div>
        <div className="more_info footmargin">
          <Link to ='/'>Privacy</Link>
        </div>

        <div className="more_info footmargin">
        <Link to ='/'> Terms</Link>
        </div>

        <div className="more_info footmargin">
        <Link to ='/'>  Contact Us</Link>
        </div>

        <div className="more_info footmargin">
        <Link to ='/'>@copyright CollegeConnect</Link>
        </div>

        <div className="social_media footmargin">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
      </section>
    </footer>
  );
}
