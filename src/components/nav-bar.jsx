import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav-bar.css';
import { useState, useEffect } from 'react';

export default function NavBar() {
  // create a window listener to set a state for the viewport width and use that state to conditionally render the nav-bar
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const [menuToggle, setMenuToggle] = useState('closed');
  const [breakpoint, setBreakpoint] = useState('1024');
  const smallBreakpoint = 500;
  const midBreakpoint = 768;
  const largeBreakpoint = 1024;

  useEffect(() => {
    if (widthSize < smallBreakpoint) {
      setBreakpoint('small');
    } else if (widthSize < midBreakpoint) {
      setBreakpoint('mid');
    } else if (widthSize < largeBreakpoint) {
      setBreakpoint('large');
    } else {
      setBreakpoint('large');
    }
  }
  , [widthSize]);


  useEffect(() => {
    window.addEventListener('resize', () => setWidthSize(window.innerWidth));
  }, []);

  function toggleMenu() {
    setMenuToggle(menuToggle === 'closed' ? 'open' : 'closed');
  }

  return (
    <>
        <div className="nav-bar">
            <Link to="/" className="nav-logo">[NAME]</Link>
          <div className="nav-links-container">
            { breakpoint === 'small' || breakpoint === 'mid' ?
            <div className='nav-menu-container'>
              <div className='nav-menu' onClick={toggleMenu}>☰</div>
            </div>
            :
            null
            }
          </div>
            <div className="nav-links">
              {
                (breakpoint === 'small' || breakpoint === 'mid') && menuToggle  === 'open' ?
                <div className='floating-nav-items'>
                  <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
                  <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
                  <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
                </div>
                : 
                  null
              }
              {
                breakpoint === 'large' ?
                  <div className='menu-nav-items'>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                  </div>
                : 
                  null
              }
            </div>
        </div>
      </>
  )
}