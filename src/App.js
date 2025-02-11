import React from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";

// Screens
import Landing from "./screens/Landing.jsx";
import Akinator from "./components/Sections/Akinator";
import Bluffing from "./components/Sections/Bluffing";
import Taboo from "./components/Sections/Taboo";
import OurMission from "./components/Sections/OurMission";
import GameSkills from "./components/Sections/GameSkills";
import BlogPage from "./components/Sections/BlogPage";
import AboutUs from "./components/Sections/AboutUs";
import Blog from "./components/Sections/Blog";

export default function App() {
  return (
    <Router>
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
          <Route path="/ourmission" element={<OurMission />} />
          <Route path="/gameskills" element={<GameSkills />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </>
    </Router>
  );
}
