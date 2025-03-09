import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import FullButton from "../../Buttons/FullButton";
// Assets
import HomePic1 from "../../../assets/homepic/homepic1.jpg";
import HomePic2 from "../../../assets/homepic/homepic2.jpg";
import HomePic3 from "../../../assets/homepic/homepic3.jpg";
import HomePic4 from "../../../assets/homepic/homepic4.jpg";
import HomePic5 from "../../../assets/homepic/homepic5.jpg";
import HomePic6 from "../../../assets/homepic/homepic6.png"; 

export default function Header() {
  const images = [
    { src: HomePic6, animation: "none", duration: 10000 }, // Stays for 5 sec
    { src: HomePic1, animation: "fade", duration: 8000 },
    { src: HomePic2, animation: "zoom", duration: 12000 },
    { src: HomePic3, animation: "slide", duration: 16000 },
    { src: HomePic4, animation: "fade", duration: 12000 },
    { src: HomePic5, animation: "zoom", duration: 16000 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentDuration = images[currentIndex].duration;

    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, currentDuration);

    return () => clearTimeout(timeout);
  }, [currentIndex, images]);

  return (
    <Wrapper>
      {/* Background Images */}
      {images.map((image, index) => (
        <BackgroundImage
          key={index}
          src={image.src}
          animation={image.animation}
          isVisible={index === currentIndex}
        />
      ))}

      {/* Black Transparency Overlay */}
      <Overlay />

      {/* Foreground Content */}
      <ContentWrapper>
        <h1>AI Space Escape</h1>
        <HeaderP>
          Dive into Roblox escape games. Beat LLMs, outpace AI, and climb the leaderboard!
        </HeaderP>
        <a
          href="https://www.roblox.com/share?code=7d09ddeb74a9034dbec6aa27bb0572a9&type=ExperienceDetails&stamp=1737092101410"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FullButton title="Play Now" />
        </a>
      </ContentWrapper>
    </Wrapper>
  );
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;



// Styled Components
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh; /* Half the screen */
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Ensures it fills the top half */
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  z-index: -1;

  ${(props) =>
    props.isVisible &&
    props.animation !== "none" &&
    css`
      animation: ${
        props.animation === "fade"
          ? fadeIn
          : props.animation === "zoom"
          ? zoomIn
          : slideIn
      } 1s ease-in-out;
    `}
`;

// Stronger Black Overlay
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay instead of full black */
  z-index: -1; /* Below content but above background */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh; /* Bottom half of the screen */
  padding: 80px 20px 20px; 

  h1 {
    font-size: 4rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;




const HeaderP = styled.p`

  font-size: 1.3rem;
  line-height: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
