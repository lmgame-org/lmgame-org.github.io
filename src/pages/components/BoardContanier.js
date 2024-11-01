import React from 'react';
import Board from './board';



function TextContainer({ title, content1, content2 }) {
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
  
  export default TextContainer;
  
