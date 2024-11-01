import logo from './logo.svg';
import './App.css';
import Board from './components/board';
import './components/style.css'


function App() {
  return (
    <div className="App">
      <Board
        title="Top Players Leaderboard"
        columnnames={["Player Name", "Skill Level"]}></Board>
    </div>
  );
}

export default App;
