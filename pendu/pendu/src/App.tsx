import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>Pendu en React</h1>
      </header>
      <main>
        <Game/>
      </main>
    </React.Fragment>
  );
}

export default App;
