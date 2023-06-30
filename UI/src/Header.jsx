import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faInfo, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchUserComponent from './components/SearchUserComponent.jsx';

export default function Header() {
  const isLoggedIn = getLoggedInUser() ? true : false;

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <section className="top-nav">
      <div><Link to="/" className="logonew" >
        <img className='headlogo' src='../../assets/logotestheader.png' /></Link>
      </div>

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
          <FontAwesomeIcon className='icons' icon={faUser} />
          <Link to="/createPost"> Create Post </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faInfo} />
          <Link to="/about"> About Us </Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to="/logout">
              <FontAwesomeIcon className="icons" icon={faSignOutAlt} />
              Logout
            </Link>
          </li>
        )}
      </ul>

      {isSearchModalOpen && <SearchUserComponent />}
    </section>
  )
}