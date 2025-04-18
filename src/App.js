import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { initGA, logPageView } from "./utils/analytics.js";
import { useEffect } from "react";

// Screens
import Landing from "./screens/Landing.jsx";
import Landing_Escape from "./screens/Landing_Escape.jsx";
import Landing_Agent from "./screens/Landing_Agent.jsx";

import Akinator from "./components/Sections/AI_Escape/Akinator";
import Bluffing from "./components/Sections/AI_Escape/Bluffing";
import Taboo from "./components/Sections/AI_Escape/Taboo";
// import OurMission from "./components/Sections/OurMission";
// import GameSkills from "./components/Sections/GameSkills";
import BlogPage from "./components/Sections/BlogPage";
import AboutUs from "./components/Sections/AboutUs";
import Blog from "./components/Sections/Blog";


import Candy_Crush from "./components/Sections/GamingAgent/Candy_Crush";
import Sokoban from "./components/Sections/GamingAgent/Sokoban";
import Game_2048 from "./components/Sections/GamingAgent/Game_2048";
import Mario from "./components/Sections/GamingAgent/Mario";
import Tetris from "./components/Sections/GamingAgent/Tetris";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

export default function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <Analytics />
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
        </Helmet>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/akinator" element={<Akinator />} />
          <Route path="/bluffing" element={<Bluffing/>} />
          <Route path="/taboo" element={<Taboo />} />
          <Route path="/ai_escape" element={<Landing_Escape />} />
          <Route path="/gaming_agent" element={<Landing_Agent />} />
          {/* <Route path="/ourmission" element={<OurMission />} /> */}
          {/* <Route path="/gameskills" element={<GameSkills />} /> */}
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/mario" element={<Mario />} />
          <Route path="/sokoban" element={<Sokoban/>} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/candy_crush" element={<Candy_Crush />} />
          <Route path="/game_2048" element={<Game_2048/>} />
        </Routes>
      </>
    </Router>
  );
}
