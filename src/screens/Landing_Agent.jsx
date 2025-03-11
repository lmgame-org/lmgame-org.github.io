import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Home_Agent from "../components/Sections/GamingAgent/Home_Agent";
import LeaderBoard_Agent from "../components/Sections/GamingAgent/LeaderBoard_Agent";
import Gallery from "../components/Sections/Home/Gallery";
import Footer from "../components/Sections/Footer"
import Contact from "../components/Sections/Contact"



export default function Landing_Agent() {
  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Home_Agent />
      {/* <Gallery /> */}
      <LeaderBoard_Agent />
      <Footer />
    </>
  );
}


