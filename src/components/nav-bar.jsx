// create a nav bar component for a profolia of a designer, so add their name as [NAME] and Link elements for the home page, about page, projects page, and contact page
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav-bar.css';

export default function NavBar() {

  return (
    <div className="nav-bar">
      <Link to="/" className="nav-link">[NAME]</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/projects" className="nav-link">Projects</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </div>
  )
}