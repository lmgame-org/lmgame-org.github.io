import React, { useState, useEffect } from 'react';
import LeaderboardProfiles from './allProfiles';
import styled from 'styled-components';
import { BASE_URL } from '../../backend/config';

export default function OverallLeaderboard({
    columnnames = ["Model Name", "Akinator Score", "Bluffing Score", "Taboo Score", "Average Score"],
}) {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'averageScore', order: 'descending' });
    const [searchQuery, setSearchQuery] = useState("");
    const [totalSessions, setTotalSessions] = useState(null); // State to store total sessions
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all([
                    fetch(`${BASE_URL}/api/akinator/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/bluffing/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/taboo/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/general/model`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/general/total_sessions`).then(res => res.json()) // Fetch total sessions
                ]);
                
                const [akinatorData, bluffingData, tabooData, overallData, sessionData] = responses;
                const aggregatedData = mergeLeaderboards(akinatorData, bluffingData, tabooData, overallData);
                setLeaderboardData(aggregatedData);
                setTotalSessions(sessionData.total_sessions); // Set total sessions count
                setError(null);
            } catch (err) {
                console.error("Error fetching leaderboard data:", err);
                setError("Failed to fetch leaderboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const handleSortChange = (key) => {
        setSortConfig(prev => ({
            key,
            order: prev.key === key ? (prev.order === 'ascending' ? 'descending' : 'ascending') : 'descending'
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = leaderboardData
        .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const aVal = a[sortConfig.key] === 'N/A' ? -Infinity : parseFloat(a[sortConfig.key]);
            const bVal = b[sortConfig.key] === 'N/A' ? -Infinity : parseFloat(b[sortConfig.key]);
            
            if (aVal === bVal) return a.name.localeCompare(b.name);
            return sortConfig.order === 'ascending' ? aVal - bVal : bVal - aVal;
        });

    return (
        <div className="board">
            <h1 className="leaderboard">Overall Model Leaderboard</h1>
            
            {/* Display total game sessions */}
            {totalSessions !== null && (
                <div className="total-sessions">
                    <strong>Total Game Sessions: </strong>{totalSessions}
                </div>
            )}

            {/* Search Input */}
            <input
                type="text"
                placeholder="Filter models..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* Column Headers */}
            <div className="columnnames">
                <div className="column-item objectname">{columnnames[0]}</div>
                {columnnames.slice(1).map((name, index) => {
                    const columns = ['akinatorScore', 'bluffingScore', 'tabooScore', 'averageScore'];
                    const colKey = columns[index];
                    const isActive = sortConfig.key === colKey;
                    
                    return (
                        <div key={colKey} className="column-item skill-strength">
                            {name}
                            <button 
                                onClick={() => handleSortChange(colKey)}
                                className="sort-button"
                            >
                                {isActive ? (sortConfig.order === 'ascending' ? '↑' : '↓') : '↕'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Leaderboard Profiles */}
            <div className="profiles-container">
                <LeaderboardProfiles 
                    leaderboardData={filteredData.map((item, index) => ({
                        ...item,
                        rank: index + 1  // Add rank based on sorted position
                    }))} 
                />
            </div>

            {/* Row Count */}
            <div className="row-count">
                {`${filteredData.length} of ${leaderboardData.length} rows`}
            </div>
        </div>
    );
}

function mergeLeaderboards(akinator, bluffing, taboo, overall) {
    const scoreMap = {};

    // Helper function to process each leaderboard
    const processLeaderboard = (data, key) => {
        data.forEach(({ name, score }) => {
            if (!scoreMap[name]) {
                scoreMap[name] = {
                    name,
                    akinatorScore: 'N/A',
                    bluffingScore: 'N/A',
                    tabooScore: 'N/A',
                    averageScore: 'N/A'
                };
            }
            scoreMap[name][key] = score;
        });
    };

    // Process all leaderboards
    processLeaderboard(akinator, 'akinatorScore');
    processLeaderboard(bluffing, 'bluffingScore');
    processLeaderboard(taboo, 'tabooScore');
    processLeaderboard(overall, 'averageScore');

    // Calculate average scores and convert to numbers
    return Object.values(scoreMap).map(user => {
        const validScores = [user.akinatorScore, user.bluffingScore, user.tabooScore]
            .filter(score => score !== 'N/A')
            .map(Number);
            
        return {
            ...user,
            averageScore: validScores.length > 0 
                ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2)
                : 'N/A'
        };
    });
}
