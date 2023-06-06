import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
      </ul>
    </section>
  )
}