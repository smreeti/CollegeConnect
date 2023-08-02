import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faInfo, faSignOutAlt, faSearch, faFileImage, faFlag, faBell, faUserGear } from '@fortawesome/free-solid-svg-icons';
import SearchUserComponent from './components/SearchUserComponent.jsx';
import { Dropdown } from "react-bootstrap";
import CreatePostComponent from './components/CreatePostComponent.jsx';
import UserType from '../utils/UserTypeConstants';

export default function Header() {
  const loggedInUser = getLoggedInUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track the menu open/close state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  }

  return (
    <section className="top-nav">
      <div><Link to="/home" className="logonew" >
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

        <li className='tabmenu'>
          <FontAwesomeIcon className='icons' icon={faHome} />
          <Link to="/home"> Home </Link>
        </li>

        <li className='tabmenu'>
          <FontAwesomeIcon className='icons' icon={faSearch} />
          <Link onClick={() => {
            toggleMenu(); // Close the menu when Create Post is clicked
            openSearchModal(); // Open the Create Post modal
          }}
            data-target="modal1" className="modal-trigger">Search</Link>
        </li>

        {
          loggedInUser.userTypeId.code == (UserType.REGULAR_USER && UserType.ADMIN) &&
          (
            <li className='tabmenu'>
              <FontAwesomeIcon className="icons" icon={faFileImage} />
              <Link onClick={() => {
                toggleMenu(); // Close the menu when Create Post is clicked
                openCreatePostModal(); // Open the Create Post modal
              }} data-target="createPostModal" className="modal-trigger">Create Post</Link>
            </li>
          )
        }


        {
          loggedInUser.userTypeId.code == UserType.ADMIN &&
          (
            <li className='tabmenu'>
              <FontAwesomeIcon className='icons' icon={faFlag} />
              <Link to="/reports"> Reports </Link>
            </li>
          )
        }

        {
          loggedInUser.userTypeId.code == UserType.MASTER &&
          (
            <li className='tabmenu'>
              <FontAwesomeIcon className='icons' icon={faUserGear} />
              <Link to="/listofusers">Manage Users </Link>
            </li>
          )
        }

        <li className='tabmenu'>
          <FontAwesomeIcon className='icons' icon={faBell} />
          <Link to="/notifications"> Notifications</Link>
        </li>

        <li className='tabmenu'>
          <FontAwesomeIcon className='icons' icon={faInfo} />
          <Link to="/about"> About Us </Link>
        </li>

        <li className="heightli tabmenu">
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
                  <Link
                    to={`/profile/${loggedInUser._id}`}
                    onClick={closeMenu}>
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

      {isCreatePostModalOpen && <CreatePostComponent />}
    </section>
  )
}