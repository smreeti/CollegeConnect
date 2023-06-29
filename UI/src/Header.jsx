import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { faHome, faUser, faInfo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faImage  } from '@fortawesome/free-solid-svg-icons';




export default function Header() {
  const isLoggedIn = getLoggedInUser() ? true : false;

  return (
    <section className="top-nav">
      <div><Link to="/" className="logonew" >
        <img className='headlogo' src='../../assets/logotestheader.png' /></Link>
      </div>

      <label className="menu-button-container" htmlFor="menu-toggle">
        {/* <div className="menu-button"></div> */}
      </label>
      <input id="menu-toggle" type="checkbox" />
      <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button"></div>
      </label>


      <ul className="menu">
        
<li>
<input type="text" id="search-input" placeholder="Search" />

</li>
        <li>
          <FontAwesomeIcon className='icons iconimg' icon={faHome} />
          <Link className='menuname' to="/home"> Home </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons iconimg' icon={faImage } />
          <Link className='menuname' to="/createPost"> Create Post </Link>
        </li>

        <li>
          <FontAwesomeIcon className='icons iconimg' icon={faInfo} />
          <Link className='menuname' to="/about"> About Us </Link>
        </li>

     

          <li>

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