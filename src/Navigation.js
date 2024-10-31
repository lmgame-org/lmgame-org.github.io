import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    return (
      <nav>
        <ul>
          <li>
            <button onClick={toggleDropdown}>Games Menu</button>
            {isOpen && (
              <ul className="dropdown">
                <li><Link to="/akinator">Akinator Game</Link></li>
                <li><Link to="/taboo">Taboo Game</Link></li>
                <li><Link to="/bluffing">Bluffing Game</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    );
  }
export default Navigation;