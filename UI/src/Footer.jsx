import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer>
      <section id="footer">
        <div className="need_help">
          <h1>CollegeConnect</h1>
        </div>

        <div className="company">
          <h1>About US</h1>
        </div>

        <div className="more_info">
          <h1>Blog</h1>
        </div>

        <div className="more_info">
          <h1>Jobs</h1>
        </div>

        <div className="more_info">
          <h1>Help</h1>
        </div>

        <div className="more_info">
          <h1>API</h1>
        </div>

        <div className="more_info">
          <h1>Privacy</h1>
        </div>

        <div className="more_info">
          <h1>Terms</h1>
        </div>

        <div className="more_info">
          <h1>Top Accounts</h1>
        </div>

        <div className="more_info">
          <h1>Contact US</h1>
        </div>

        <div className="social_media">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
      </section>

      <p>Copyright &copy; 2022 | The Souled Store</p>
    </footer>
  );
}
