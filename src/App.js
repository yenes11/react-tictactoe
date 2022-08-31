import './App.css';
import { Game } from './components/game/Game';
import { Scoreboard } from './components/scoreboard/Scoreboard';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Scoreboard />
        <Game />
      </div>
    </GlobalProvider>
  );
}

export default App;
