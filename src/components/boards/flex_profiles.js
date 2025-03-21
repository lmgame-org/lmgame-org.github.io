// Profiles.js
import React from 'react';

export default function Profiles({ Leaderboard, columnkeys, onRowClick }) {
  return (
    <div id="profile">
      {Leaderboard.map((user, index) => (
        <div
          className="profile-row grid-layout"
          key={index}
          onClick={() => onRowClick && onRowClick(user)}
          style={{
            display: 'grid',
            gridTemplateColumns: `50px repeat(${columnkeys.length}, 1fr)`,
            cursor: onRowClick ? 'pointer' : 'default',
          }}
        >
          <div className={`profile-cell rank ${user.rank <= 3 ? 'top-three' : ''}`}>
            #{user.rank}
          </div>
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
