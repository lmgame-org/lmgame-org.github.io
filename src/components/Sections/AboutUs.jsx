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
  return (
    <Wrapper id="AboutUs">
      <TopNavbar />
      <LightBgContainer className="lightBg">
        <div className="container">
          <HeaderContainer>
            <HeaderInfo>
              <h1 className="font40 extraBold">About Us</h1>
              <TextContainer>
                <p className="font18">
                  Game Arena is a crowdsourcing platform that hosts live computer games to evaluate AI models. As a team of passionate researchers from UC San Diego and UC Berkeley, we design and maintain gamified AI benchmarks using rigorous scientific methods.
                  <br />
                  <br />
                  <br />
                  Advisors: HaoJian Jin, Ion Stoica, Hao Zhang.
                  <br />
                  Members: Anze Xie, Haoyang Yu, Jason Kong, Jessica Zhang, Lanxiang Hu, Qiyu Li, Tony Meng, Yuxuan Zhang.
                </p>
              </TextContainer>
            </HeaderInfo>
          </HeaderContainer>
        </div>
      </LightBgContainer>
      <Footer />
    </Wrapper>
  );
}


const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  flex: 1; /* Ensure it expands fully */
  padding: 0;
  margin: 0;
`;


const LightBgContainer = styled.div`
  flex: 1; /* Forces it to expand */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%; /* Ensures it stretches */
  flex: 1; /* Makes it expand fully */
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px; /* Ensures spacing */
  text-align: left;
  line-height: 1.6;
  flex: 1; /* Helps it expand */
`;

const HeaderInfo = styled.div`
  text-align: center;
  max-width: 800px; // Limits width for better readability
  margin: 0 auto; // Ensures proper centering
  padding: 0 20px; // Adds slight padding for spacing
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
