import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faInfo, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';

export default function Header() {
  const isLoggedIn = getLoggedInUser() ? true : false;

  return (
    <section className="top-nav">
      <div><Link to="/" className="logonew" >
        <img className='headlogo' src='../../assets/logotestheader.png' /></Link>
      </div>

      <input id="menu-toggle" type="checkbox" />
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
          <Link to="/search" data-target="modal1" className="modal-trigger"> Search </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faUser} />
          <Link to="/profile"> Profile </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faUser} />
          <Link to="/createPost" data-target="modal1" className="modal-trigger"> Create Post </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons' icon={faInfo} />
          <Link to="/about"> About Us </Link>
        </li>

        {/* {isLoggedIn && (
          <li>
            <Link to="/logout">
              <FontAwesomeIcon className="icons" icon={faSignOutAlt} />
              Logout
            </Link>
          </li> */}

<li className='heightli'>

<Dropdown className='iconimg'>
  <Dropdown.Toggle variant="secondary" id="profile-dropdown">
   <img id='prfimg' src='./../assets/viewprofileimage.jpeg' />
    <span id='username' >John Doe</span>
  </Dropdown.Toggle>
  <li>
  <Dropdown.Menu className='test'>
    <Dropdown.Item className="custom-item">
    <FontAwesomeIcon className='icons' icon={faUser} />

      <Link to="/profile"> Profile </Link>
    </Dropdown.Item>
   
    {isLoggedIn && (
      <Dropdown.Item>
        <FontAwesomeIcon className="icons" icon={faSignOutAlt} />
        <Link to="/logout"> Logout </Link>
      </Dropdown.Item>
    )}
  </Dropdown.Menu>
  </li>

</Dropdown>
</li>

      </ul>
    </section>
  )
}