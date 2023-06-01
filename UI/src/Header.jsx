import React from 'react';

export default function Header() {
    return (
        <header className="header">
        <div className="container">
          <div className="logo"> Logo</div>
          <nav className="navigation">
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Colleges</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    )
}