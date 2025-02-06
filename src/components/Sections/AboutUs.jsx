import React, { useState } from "react";
import styled from "styled-components";
// Components
import ImgBox from "../Elements/ImgBox";

// Assets
import Image1 from "../../assets/img/bgs/b2.jpg";
import Image2 from "../../assets/img/bgs/b3.jpg";

import { useNavigate } from "react-router-dom";

import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

import Image from "../../assets/img/bgs/b4.jpg";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <Wrapper id="AboutUs">
      <TopNavbar />
      <div className="lightBg" style={{ padding: "120px 0" }}>
        <div className="container">
          <HeaderContainer className="flexCenter">
            <HeaderInfo>
              <h1 className="font40 extraBold">About Us</h1>
              
              <TextContainer>
                <p className="font16" style={{ textAlign: 'left' }}>
                <br />
                  At GameArena, we use gaming to evaluate LLMs by integrating rigorous scientific testing with interactive gameplay. Our custom-designed games—Akinator, Taboo, and Bluffing—assess various reasoning abilities within a dynamic Roblox-based escape game, challenging both AI and human intelligence while advancing AI research.
                  <br />
                  <br />
                  <br />
                  Advisors: Haojian Jin, Ion Stoica, Hao Zhang    
                  <br />
                  Members: Lanxiang Hu, Anze Xie, Qiyu Li, Haoyang Yu, Jsessica Zhang, Tony Meng, Jason Kong, Yuxuan Zhang
                </p>
              </TextContainer>
            </HeaderInfo>
          </HeaderContainer>

        </div>
      </div>
    <Footer />
    </Wrapper>
    
  );
}

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh; // Ensures it fills the entire screen height
  display: flex;
  flex-direction: column;
  padding: 0; // Remove any extra padding
  margin: 0; // Remove unnecessary margins
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center; // Centers the header
  align-items: center;
  flex-wrap: wrap; // Ensures responsiveness
  margin-bottom: 30px; // Reduced space for a tighter layout

  @media (max-width: 860px) {
    flex-direction: column; // Stack elements on smaller screens
  }
`;

const HeaderInfo = styled.div`
  text-align: center;
  max-width: 800px; // Limits width for better readability
  margin: 0 auto; // Ensures proper centering
  padding: 0 20px; // Adds slight padding for spacing
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 900px; // Keeps text container from stretching too wide
  margin: 0 auto;
  padding: 10px 20px; // Adjusted padding for better spacing
  text-align: left;
  line-height: 1.6; // Improves readability
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  img {
    width: 90%; /* Sets image width to 90% of the container */
    max-width: 600px; // Prevents oversized images
    height: auto; /* Maintains aspect ratio */
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px; // Reduces excess spacing
  }
`;
