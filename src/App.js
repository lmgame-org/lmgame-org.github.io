import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";

// Screens
import Landing from "./screens/Landing.jsx";
import Akinator from "./components/Sections/Akinator";

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
        </Routes>
      </>
    </Router>
  );
}
