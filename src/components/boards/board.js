import React, { useState, useEffect } from 'react';
import Profiles from './profiles';
import { Leaderboard as DefaultLeaderboard } from './database'; // Default data import
import UserInfoModal from './userInfoModal';

import { BASE_URL, UPDATE_INTERVAL, FETCH_INTERVAL } from '../../backend/config';

export default function Board({
    title,
    columnnames = ["User Name", "Rank Score"],
    clickEnabled = true,
    apiEndpoint = null,
}) {
    const [sortOrder, setSortOrder] = useState("descending");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Set initial data to the default leaderboard to handle the case where API fails
    const [leaderboardData, setLeaderboardData] = useState(DefaultLeaderboard);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!apiEndpoint) return;

        // Function to update scores (run less frequently)
        const updateScores = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/general/update`, {
                    method: "POST",
                });
                if (!response.ok) {
                    throw new Error("Failed to update scores");
                }
                console.log("Scores updated successfully");
            } catch (err) {
                console.error("Error updating scores:", err);
            }
        };

        // Function to fetch leaderboard data (run more frequently)
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboard data");
                }
                const data = await response.json();
                setLeaderboardData(data); // Update with fetched data
                setError(null); // Clear any previous error if the fetch is successful
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
                setError(err.message);
                setLeaderboardData(DefaultLeaderboard); // Use default data on failure
            } finally {
                setLoading(false);
            }
        };

        // Call the update API initially to get updated data on the first load   
        fetchData();
        updateScores();

        const updateInterval = setInterval(updateScores, UPDATE_INTERVAL);
        const fetchInterval = setInterval(fetchData, FETCH_INTERVAL);

        // Cleanup intervals on component unmount
        return () => {
            clearInterval(updateInterval);
            clearInterval(fetchInterval);
        };
    }, [apiEndpoint]);

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "ascending" ? "descending" : "ascending"));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowClick = (user) => {
        if (clickEnabled) {
            setSelectedUser(user);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Rank and filter the leaderboard data
    const rankedData = rankLeaderboard(leaderboardData);
    const filteredLeaderboard = filterAndSortLeaderboard(rankedData, sortOrder, searchQuery);

    return (
        <div className="board">
            <h1 className="leaderboard">{title}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}. Displaying default data instead.</p>}

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
                <div className="column-item skill-strength">
                    {columnnames[1]}
                    <button onClick={toggleSortOrder} className="sort-button">
                        {sortOrder === "ascending" ? "↑" : "↓"}
                    </button>
                </div>
            </div>

            {/* Scrollable Profile Rows */}
            <div className="profiles-container">
                <Profiles Leaderboard={filteredLeaderboard} onRowClick={handleRowClick} />
            </div>

            {/* Row Count Display */}
            <div className="row-count">
                {`${filteredLeaderboard.length} of ${leaderboardData.length} row(s) selected`}
            </div>

            {/* Modal Component */}
            {isModalOpen && <UserInfoModal user={selectedUser} onClose={closeModal} />}
        </div>
    );
}

function rankLeaderboard(data) {
    return data
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 })); // Assign ranks
}

function filterAndSortLeaderboard(rankedData, sortOrder, searchQuery) {
    let filteredData = rankedData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'ascending') {
        filteredData = filteredData.sort((a, b) => {
            if (a.score === b.score) {
                return a.name.localeCompare(b.name);
            }
            return a.score - b.score;
        });
    }

    return filteredData; // Return filtered and sorted data for display
}
