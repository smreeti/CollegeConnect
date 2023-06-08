import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../utils/Auth';

export default function Header() {
  const isLoggedIn = getLoggedInUser() ? true : false;

  return (
    <section className="top-nav">
      <div><Link to="/" className="logonew" >
        <img className='headlogo' src='../../assets/logotestheader.png' /></Link>
      </div>

      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <Link to="/"> Home </Link>
        <Link to="/about"> About Us </Link>
        {isLoggedIn && <Link to="/logout"> Logout </Link>}
      </ul>
    </section>
  )
}