import React from 'react';

export default function LeaderboardProfiles({ leaderboardData, onRowClick }) {
    return (
        <div id="profile">
            {leaderboardData.map((user, index) => (
                <div
                    className="flex"
                    key={user.name}
                    onClick={() => onRowClick && onRowClick(user)} // Clickable only if function is provided
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                    {/* Left-aligned model name + rank */}
                    <div className="item name-container">
                        <div className="info">
                            <span className={`rank ${user.rank <= 3 ? 'top-three' : ''}`}>
                                #{user.rank}
                            </span>
                            <h3 className="name text-dark">
                                {user.name.length > 17 ? (
                                    <>
                                        {user.name.slice(0, 17)}...
                                        <br />
                                        {user.name.slice(17)}
                                    </>
                                ) : (
                                    user.name
                                )}
                            </h3>
                        </div>
                    </div>

                    {/* Scores - Centered & Formatted to 2 Decimal Places */}
                    <div className="item score">
                        <span>{isNaN(user.akinatorScore) ? 'N/A' : Number(user.akinatorScore).toFixed(2)}</span>
                    </div>
                    <div className="item score">
                        <span>{isNaN(user.bluffingScore) ? 'N/A' : Number(user.bluffingScore).toFixed(2)}</span>
                    </div>
                    <div className="item score">
                        <span>{isNaN(user.tabooScore) ? 'N/A' : Number(user.tabooScore).toFixed(2)}</span>
                    </div>
                    <div className="item score">
                        <span>{isNaN(user.averageScore) ? 'N/A' : Number(user.averageScore).toFixed(2)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
