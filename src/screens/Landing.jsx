import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import HomePage from "../components/Sections/Home/HomePage";
import Services from "../components/Sections/Services";
import Gallery from "../components/Sections/Home/Gallery";
import Footer from "../components/Sections/Footer"
import Contact from "../components/Sections/Contact"



export default function Landing() {
  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <HomePage />

      
      <Gallery />
      <Footer />
    </>
  );
}


