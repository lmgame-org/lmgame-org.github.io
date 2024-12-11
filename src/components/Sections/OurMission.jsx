import React, { useEffect } from "react";
import styled from "styled-components";
import '../boards/style.css';
import TopNavbar from "./Pages/TopNavbar_pages";
import Footer from "./Footer";
import Image from "../../assets/img/bgs/b4.jpg";

export default function OurMission() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="OurMission">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Our Mission</h1>
              <TextContainer>
                <p className="font16">
                <br />
                  At GameArena, our mission is to redefine the evaluation of large language models (LLMs) by merging rigorous scientific testing with interactive gameplay. We have integrated our specially designed games—Akinator, Taboo, and Bluffing—each tailored to assess distinct reasoning capabilities like deductive, inductive, and abductive reasoning, into the Roblox platform to form an escape game. 
                  <br />
                  <br />
                  <br />
                  This setup tests and hones both AI and human intelligence in a dynamic environment. Our goal is to advance our understanding of AI's reasoning processes within a controlled yet engaging setting, pushing the boundaries of AI research while providing participants with a challenging and enjoyable experience.
                </p>
              </TextContainer>
            </HeaderInfo>
          </div>
        </div>
        <ImageWrapper>
            <Img1 className="radius8" src={Image} alt="Game Arena"/>
        </ImageWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  text-align: center;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const TextContainer = styled.div`
  width: 80%; // Keeps the text container at 50% width
  margin: 0 auto; // Centers the container horizontally within the parent
  padding: 20px; // Adds padding for spacing
  text-align: left; // Aligns the text to the left
`;


const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 9;
  width: 100%;
`;

const Img1 = styled.img`
  width: 600px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 50px;
`;
