import React from 'react';
import Board from './board';
import './style.css'


function BoardContainer() {
    return (
      <div class="parent-container">
        <div className="container">
            <Board
                title="Top Players Leaderboard"
                columnnames={["Player Name", "Skill Level"]}>
            </Board>
        </div>
      </div>
    );
  }
  
  export default BoardContainer;
  
