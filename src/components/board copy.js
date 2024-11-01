import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {
    const [sortOrder, setSortOrder] = useState("descending"); // State to track sort order
    const [searchQuery, setSearchQuery] = useState("");

    // Toggle sorting order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "ascending" ? "descending" : "ascending"));
    };

    // Handle changes to the search input
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredLeaderboard = between(Leaderboard, sortOrder, searchQuery)

  return (
    <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

          {/* Search Input */}
          <input
              type="text"
              placeholder="Filter usernames..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
          />

          {/* Column Headers */}
          <div className="columnnames">
              <div className="column-item objectname">User Names</div>
              <div className="column-item skill-strength">Skill Strength
                  <button onClick={toggleSortOrder} className="sort-button">
                      {sortOrder === "ascending" ? "↑" : "↓"}
                  </button>
              </div>
          </div>

          {/* Profile Rows */}
          <Profiles Leaderboard={between(Leaderboard,  sortOrder, searchQuery)} />

          {/* Row Count Display */}
          <div className="row-count">
              {`${filteredLeaderboard.length} of ${Leaderboard.length} row(s) selected`}
          </div>

    </div>
  )
}



function between(data, sortOrder, searchQuery){
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
        const matchesSearch = val.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch
    })

    // sort with asending order
    return filter.sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.score - b.score; // Ascending order
        } else {
            return b.score - a.score; // Descending order
        }
    })

}
