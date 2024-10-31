import React, { useState } from 'react';
import './App.css';
import {Routes, Route, Link } from 'react-router-dom';

import AkinatorGame from './pages/AkinatorGame';
import TabooGame from './pages/TabooGame';
import BluffingGame from './pages/BluffingGame';
import HomePage from './pages/HomePage';

import Navigation from './Navigation';
import Footer from './Footer'; 



function App() {
  return (
    <div className="App">
      <Link to="/" className="home-button">Home</Link>  
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/akinator" element={<AkinatorGame />} />
        <Route path="/taboo" element={<TabooGame />} />
        <Route path="/bluffing" element={<BluffingGame />} />
      </Routes>
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;


