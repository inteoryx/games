import logo from './logo.svg';
import './App.css';
import PresImage from './components/PresImage.js';
import IconButton from './components/IconButton.js';
import PresidentGameScreen from './screens/PresidentGameScreen.js';
import ScoreScreen from './screens/ScoreScreen.js';
import { useState, } from 'react';
import React from 'react';

const screens = {
  PresidentGameScreen: PresidentGameScreen,
  ScoreScreen: ScoreScreen,
}

function App() {
  const [screen, setScreen] = useState("PresidentGameScreen");

  return (
    <div className="App">
      {React.createElement(screens[screen], { setScreen: setScreen })}
    </div>
  );
}

export default App;
