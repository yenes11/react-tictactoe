import './App.css';
import { Game } from './components/Game';
import { Scoreboard } from './components/Scoreboard';
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
