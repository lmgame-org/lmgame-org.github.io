import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);
  
    return (
      <nav>
        <ul>
          <div className="dropdown-container">
          <button onClick={toggleDropdown} className="dropdown-button">
              Game Leaderboard Menu
            </button>
            {isOpen && (
              <ul className="dropdown">
                <li><Link to="/akinator" onClick={closeDropdown}>Akinator Game</Link></li>
                <li><Link to="/taboo" onClick={closeDropdown}>Taboo Game</Link></li>
                <li><Link to="/bluffing"  onClick={closeDropdown}>Bluffing Game</Link></li>
              </ul>
            )}
            </div>
        </ul>
      </nav>
    );
  }
export default Navigation;