import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Footer from "../components/Sections/Footer"
import Contact from "../components/Sections/Contact"



export default function Landing() {
  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Header />
      <Projects />
      <Services />
      <Footer />
    </>
  );
}


