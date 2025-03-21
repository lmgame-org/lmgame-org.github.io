// Board.js
import React, { useState } from 'react';
import Profiles from './flex_profiles';
import UserInfoModal from './userInfoModal';

export default function Board({
  title,
  columnnames = ["Name", "Score"],
  columnkeys = ["name", "score"],
  leaderboardData = [],
  clickEnabled = true,
  gamename = null,
}) {
  const [sortOrder, setSortOrder] = useState("descending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "ascending" ? "descending" : "ascending"));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRowClick = (user) => {
    if (clickEnabled) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const rankedData = leaderboardData
    .sort((a, b) => b.score - a.score)
    .map((user, i) => ({
      ...user,
      rank: i + 1,
      score: Number(user.score).toFixed(2),
    }));

  const filteredLeaderboard = rankedData
    .filter((user) =>
      String(user[columnkeys[0]] ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "ascending") return a.score - b.score;
      return b.score - a.score;
    });

  return (
    <div className="board">
      <h1 className="leaderboard">{title}</h1>

      <input
        type="text"
        placeholder={`Filter ${columnnames[0]}...`}
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Column Headers */}
      <div
        className="columnnames grid-layout"
        style={{
          gridTemplateColumns: `50px repeat(${columnnames.length}, 1fr)`,
        }}
      >
        <div className="column-item">Rank</div>
        {columnnames.map((name, i) => (
          <div className="column-item" key={i}>
            {name}
            {columnkeys[i] === "score" && (
              <button onClick={toggleSortOrder} className="sort-button">
                {sortOrder === "ascending" ? "↑" : "↓"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Profiles */}
      <div className="profiles-container">
        <Profiles
          Leaderboard={filteredLeaderboard}
          columnkeys={columnkeys}
          onRowClick={handleRowClick}
        />
      </div>

      <div className="row-count">
        {`${filteredLeaderboard.length} of ${leaderboardData.length} row(s) selected`}
      </div>

      {isModalOpen && (
        <UserInfoModal
          gamename={gamename}
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
