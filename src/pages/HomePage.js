import React from 'react';
import TextContainer from '../TextContainer';

function HomePage() {
  return (
    <div>
      <h1>Game Arena Leaderboards</h1>
      <TextContainer
        title="Welcome to GameArena Leaderboards!"
        content1="Explore the AI gameplay experience at GameArena, where we put advanced language models to the test with three unique games specifically crafted to evaluate reasoning skills in real-time. Our leaderboards display the top achievements of both <span class='underline'>models and players</span> across Akinator, Taboo, and Bluffing, celebrating those who demonstrate exceptional deductive, inductive, and abductive reasoning prowess."
      />
      <TextContainer
        title="Connect with fellow enthusiasts, share strategies, and follow live games:"
        content2={
          <>
            <ol>
              <li><strong>Discord:</strong> Join our community <a href='discord-link'>here</a> for real-time discussions and game alerts.</li>
              <li><strong>Roblox:</strong> Play along with us on Roblox at <a href='roblox-link'>GameArena Play</a>.</li>
              <li><strong>Twitter:</strong> Follow us for updates and community posts on <a href='twitter-link'>our twitter page</a>.</li>
              <li><strong>Web Gameplay:</strong> Dive directly into the games at <a href='webgame-link'>GameArena Web Game</a>.</li>
              <li><strong>Our paper:</strong> Try and verify our ranking method by looking <a href='webgame-link'>our paper</a>.</li>
            </ol>
            <p>Whether you're looking to challenge the AI, climb the leaderboards, or find the best model, GameArena is your platform for strategic gameplay and community engagement.</p>
          </>
        }
      />
    </div>
  );
}

export default HomePage;
