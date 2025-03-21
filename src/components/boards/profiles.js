import React from 'react';

export default function Profiles({ Leaderboard, columnkeys, onRowClick }) {
  return (
    <div className="profiles-container">
      {Leaderboard.map((user, index) => (
        <div
          key={index}
          className="profile-row"
          style={{ gridTemplateColumns: `50px repeat(${columnkeys.length}, 1fr)` }}
          onClick={() => onRowClick && onRowClick(user)}
        >
          <div className="profile-cell">#{user.rank}</div>
          {columnkeys.map((key, i) => (
            <div className="profile-cell" key={i}>
              {String(user[key] ?? '')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
