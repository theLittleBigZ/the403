import React from 'react';
import './App.css';
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <AboutMe />
        <Portfolio />
      </div>
    </div>
  );
}

export default App;
