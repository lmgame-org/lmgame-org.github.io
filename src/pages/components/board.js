import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board( {title = "LeaderBoard", columnnames = ["User Name", "Skill Strength"]}) {
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

    const rankedData = rankLeaderboard(Leaderboard)
    const filteredLeaderboard = filterAndSortLeaderboard(rankedData, sortOrder, searchQuery)

  return (
    <div className="board">
        <h1 className='leaderboard'>{title}</h1>

          {/* Search Input */}
          <input
              type="text"
              placeholder={`Filter ${columnnames[0]}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
          />

          {/* Column Headers */}
          <div className="columnnames">
              <div className="column-item objectname">{columnnames[0]}</div>

              {/* Second column with sorting functionality */}
              <div className="column-item skill-strength">
                  {columnnames[1]}
                  <button onClick={toggleSortOrder} className="sort-button">
                      {sortOrder === "ascending" ? "↑" : "↓"}
                  </button>
              </div>
          </div>

          {/* Scrollable Profile Rows */}
          <div className="profiles-container">
              <Profiles Leaderboard={filteredLeaderboard} />
          </div>

          {/* Row Count Display */}
          <div className="row-count">
              {`${filteredLeaderboard.length} of ${Leaderboard.length} row(s) selected`}
          </div>

    </div>
  )
}


function rankLeaderboard(data) {
    // Sort data in descending order and assign ranks based on this order
    return data
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 })); // Assign ranks
}

function filterAndSortLeaderboard(rankedData, sortOrder, searchQuery) {
    // Filter data based on search query
    let filteredData = rankedData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort data for display based on the specified order
    if (sortOrder === 'ascending') {
        filteredData = filteredData.slice().sort((a, b) => a.score - b.score);
    }

    return filteredData; // Return filtered and sorted data for display
}
