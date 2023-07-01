import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faInfo, faSignOutAlt, faSearch, faFileImage } from '@fortawesome/free-solid-svg-icons';
import SearchUserComponent from './components/SearchUserComponent.jsx';
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const loggedInUser = getLoggedInUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track the menu open/close state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <section className="top-nav">
      <div><Link to="/" className="logonew" >
        <img className='headlogo' src='../../assets/logotestheader.png' /></Link>
      </div>

      <input
        id="menu-toggle"
        type="checkbox"
        checked={isMenuOpen}
        onChange={toggleMenu}
      />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>

      <ul className="menu">

        <li>
          <FontAwesomeIcon className='icons' icon={faHome} />
          <Link to="/home"> Home </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faSearch} />
          <button onClick={openSearchModal} data-target="modal1" className="modal-trigger">Search</button>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faUser} />
          <Link to="/profile"> Profile </Link>
        </li>

        <li>
          <FontAwesomeIcon className="icons" icon={faFileImage} />
          <Link
            to="/createPost"
            data-target="modal1"
            className="modal-trigger"
            onClick={closeMenu}
          >
            Create Post
          </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faInfo} />
          <Link to="/about"> About Us </Link>
        </li>

        <li className="heightli">
          {loggedInUser && (
            <Dropdown className="iconimg">
              <Dropdown.Toggle variant="secondary" id="profile-dropdown">
                {loggedInUser?.profilePicture === "default" ? (
                  <img id="prfimg" src="/assets/profile.png" alt="Profile" />
                ) : (
                  <img
                    id="prfimg"
                    src={loggedInUser?.profilePicture}
                    alt="Profile"
                  />
                )}
                <span id="profileName">
                  {loggedInUser?.firstName + " " + loggedInUser?.lastName}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="test">
                <Dropdown.Item className="custom-item">
                  <FontAwesomeIcon className="icons" icon={faUser} />
                  <Link to="/profile" onClick={closeMenu}>
                    Profile
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <FontAwesomeIcon className="icons" icon={faSignOutAlt} />
                  <Link to="/logout" onClick={closeMenu}>
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </li>
      </ul>

      {isSearchModalOpen && <SearchUserComponent />}
    </section>
  )
}