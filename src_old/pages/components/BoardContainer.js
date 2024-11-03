import React from 'react';
import Board from './board';
import './style.css'


function BoardContainer({ title = "Top Player LeaderBoard", columnnames = ["User Name", "Skill Strength"] }) {
    return (
      <div class="parent-container">
        <div className="container">
            <Board
                title={title}
                columnnames={columnnames}>
            </Board>
        </div>
      </div>
    );
  }
  
  export default BoardContainer;
  
