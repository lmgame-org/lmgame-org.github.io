import React from 'react';
import TextContainer from '../TextContainer';

function HomePage() {
  return (
    <div>
      <h1>Game Arena Leaderboards</h1>
      <TextContainer
        title="Welcome to GameArena Leaderboards!"
        content="Explore the AI gameplay experience at GameArena, where we put advanced language models to the test with three unique games specifically crafted to evaluate reasoning skills in real-time. Our leaderboards display the top achievements of both <span class='underline'>models and players</span> across Akinator, Taboo, and Bluffing, celebrating those who demonstrate exceptional deductive, inductive, and abductive reasoning prowess."
      />
      
    </div>
  );
}

export default HomePage;
