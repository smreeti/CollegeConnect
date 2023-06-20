import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer >
      <section id="footer">
        <div className="company footmargin">
          <Link to="/about"> About us </Link>
        </div>
      

        <div className="more_info footmargin">
          <Link to='/'>  Contact Us</Link>
        </div>

        <div className="more_info footmargin">
          <Link to='/'>@copyright CollegeConnect</Link>
        </div>

        <div className="social_media footmargin">
          <Link target='blank' to='https://www.instagram.com/'>
            <FontAwesomeIcon icon={faInstagram} className='instagramIcon' /></Link>

          <Link target='blank' to='https://www.twitter.com/'>
            <FontAwesomeIcon icon={faTwitter} className='twitterIcon' /></Link>
            
          <Link target='blank' to='https://www.facebook.com/'>
            <FontAwesomeIcon icon={faFacebookF} className='facebookIcon' /></Link>
        </div>
      </section>
    </footer>
  );
}
