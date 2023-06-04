import React from 'react';

export default function Header() {
    return (
          <section className="top-nav">
        <div><a className="logonew" href="index.html" />
       <img src='../../assets/logotestheader.png' />
        </div>
    
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li><a href="index.html">HOME</a></li>
     
          <li>CREATE ACCOUNT</li>
      
        </ul>
      </section>
    )
}