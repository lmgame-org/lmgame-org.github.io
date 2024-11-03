import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="home-button">Home</Link>
      <Navigation />
    </header>
  );
}

export default Header;
