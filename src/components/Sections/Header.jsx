import React, { useState, useEffect } from 'react';
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage1 from "../../assets/img/bgs/bg1.jpg";
import HeaderImage2 from "../../assets/img/bgs/bg2.jpg";
import HeaderImage3 from "../../assets/img/bgs/bg3.jpg";

const Img1 = styled.img`
  width: 426px;   // Fixed width
  height: 607px;  // Fixed height
  object-fit: cover;  // Ensures the image covers the area properly
  border-radius: 8px;  // Applies rounded corners
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 1s ease-in-out;
`;

export default function Header() {
  const images = [HeaderImage1, HeaderImage2, HeaderImage3];
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); 
      setTimeout(() => {
        setCurrentImage((current) => {
          const index = images.indexOf(current);
          return images[(index + 1) % images.length];
        });
        setIsVisible(true); 
      }, 1000); 
    }, 6000);
    return () => clearInterval(intervalId); 
  }, []);
  

  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font60">Game Arena</h1>
          <HeaderP className="font13 semiBold">
          Think you've got what it takes? Dive into our Roblox escape games and beat LLMs. Challenge your reasoning, outpace the AI, and climb to the top of the leaderboard!
          </HeaderP>
          <BtnWrapper>
            <FullButton title="Play Now" />
          </BtnWrapper>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img1 className="radius8" src={currentImage} alt="Game Arena" isVisible={isVisible} />
        </ImageWrapper>
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;