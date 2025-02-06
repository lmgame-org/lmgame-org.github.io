import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../../backend/config';

export default function OverallLeaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sortColumn, setSortColumn] = useState('averageScore');
    const [sortOrder, setSortOrder] = useState('descending');

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all([
                    fetch(`${BASE_URL}/api/akinator/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/bluffing/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/taboo/models`).then(res => res.json()),
                    fetch(`${BASE_URL}/api/general/model`).then(res => res.json())
                ]);
                
                const [akinatorData, bluffingData, tabooData, overallData] = responses;
                const aggregatedData = mergeLeaderboards(akinatorData, bluffingData, tabooData, overallData);
                setLeaderboardData(aggregatedData);
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

    const handleSort = (column) => {
        const newOrder = sortColumn === column && sortOrder === 'ascending' ? 'descending' : 'ascending';
        setSortColumn(column);
        setSortOrder(newOrder);
        setLeaderboardData([...leaderboardData].sort((a, b) => {
            const orderMultiplier = newOrder === 'ascending' ? 1 : -1;
            return (a[column] - b[column]) * orderMultiplier;
        }));
    };

    return (
        <LeaderboardWrapper>
            <h1 className="leaderboard">Overall Model Leaderboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}. Displaying no data.</p>}

            <Table>
                <thead>
                    <tr>
                        <Th onClick={() => handleSort('name')}>Model Name</Th>
                        <Th onClick={() => handleSort('akinatorScore')}>Akinator Score</Th>
                        <Th onClick={() => handleSort('bluffingScore')}>Bluffing Score</Th>
                        <Th onClick={() => handleSort('tabooScore')}>Taboo Score</Th>
                        <Th onClick={() => handleSort('averageScore')}>Average Score</Th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((user) => (
                        <tr key={user.name}>
                            <td>{user.name}</td>
                            <td>{user.akinatorScore || 'N/A'}</td>
                            <td>{user.bluffingScore || 'N/A'}</td>
                            <td>{user.tabooScore || 'N/A'}</td>
                            <td>{user.averageScore}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </LeaderboardWrapper>
    );
}

function mergeLeaderboards(akinator, bluffing, taboo, overall) {
    const scoreMap = {};

    const processLeaderboard = (data, key) => {
        data.forEach(({ name, score }) => {
            if (!scoreMap[name]) {
                scoreMap[name] = { name, akinatorScore: 'N/A', bluffingScore: 'N/A', tabooScore: 'N/A', averageScore: 0, count: 0 };
            }
            scoreMap[name][key] = score;
            scoreMap[name].count++;
        });
    };

    processLeaderboard(akinator, 'akinatorScore');
    processLeaderboard(bluffing, 'bluffingScore');
    processLeaderboard(taboo, 'tabooScore');
    processLeaderboard(overall, 'averageScore');

    return Object.values(scoreMap).map(user => {
        const validScores = [user.akinatorScore, user.bluffingScore, user.tabooScore].filter(score => score !== 'N/A');
        return {
            ...user,
            averageScore: validScores.length > 0 ? (validScores.reduce((sum, s) => sum + s, 0) / validScores.length).toFixed(2) : 'N/A'
        };
    }).sort((a, b) => b.averageScore - a.averageScore);
}

const LeaderboardWrapper = styled.div`
    width: 100%;
    max-width: 2200px; /* Increased width for better visibility */
    margin: 0 auto;
    padding: 20px;
    overflow-x: auto;
    text-align: center;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        min-width: 150px; /* Ensure columns don't shrink too much */
    }

    th {
        background-color: #f4f4f4;
        cursor: pointer;
    }
`;

const Th = styled.th`
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
`;
