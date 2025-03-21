import React from 'react';
import Profiles from './profiles'; // Adjust path if needed

export default function LocalBoard() {
  // ✅ Local Data
  const data = [
    { model_name: "o1", score: 97, steps: 25 },
    { model_name: "o3-mini-medium", score: 90, steps: 25 },
    { model_name: "Deepseek-R1", score: 91, steps: 25 },
    { model_name: "Claude 3.7", score: 35, steps: 25 },
    { model_name: "Gemini 2.0 flash thinking", score: 18, steps: 25 },
  ];

  // ✅ Add rank and format score
  const rankedData = data
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
      score: item.score.toFixed(2),
    }));

  // ✅ Define column keys to show (not including rank column)
  const columnkeys = ["model_name", "score", "steps"];

  return (
    <div className="board">
      <h2>Local Model Leaderboard</h2>

      {/* Optional: Table header */}
      <div className="columnnames">
        <div className="column-item">Rank</div>
        <div className="column-item">Model Name</div>
        <div className="column-item">Score</div>
        <div className="column-item">Steps</div>
      </div>

      {/* Profile rows */}
      <Profiles Leaderboard={rankedData} columnkeys={columnkeys} />
    </div>
  );
}
