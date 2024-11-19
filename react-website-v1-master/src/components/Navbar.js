import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src="./images/title.png" className="App-title" />
          </Link>
          <a href="http://www.cms.co.in/" target="_blank" rel="noopener noreferrer">
          <img src="./images/logo.png" className="App-logo" />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
