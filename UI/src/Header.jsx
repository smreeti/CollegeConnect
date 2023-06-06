import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
          <section className="top-nav">
        <div><a className="logonew" href="index.html" />
       <img className='headlogo' src='../../assets/logotestheader.png' />
        </div>
    
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li><a href="index.html">HOME</a></li>
     
          <Link to="/about">  <li>About Us</li> </Link>
      
        </ul>
      </section>
    )
}