import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import FullButton from "../../Buttons/FullButton";
// Assets
import HomePic1 from "../../../assets/homepic/homepic1.jpg";
import HomePic2 from "../../../assets/homepic/homepic2.jpg";
import HomePic3 from "../../../assets/homepic/homepic3.jpg";
import HomePic5 from "../../../assets/homepic/homepic5.jpg";
import HomePic7 from "../../../assets/homepic/homepic7.jpg";
import HomePic8 from "../../../assets/homepic/homepic8.jpg";
import HomePic9 from "../../../assets/homepic/homepic9.jpg";
import Teris from "../../../assets/homepic/teris.gif";
import Candy from "../../../assets/homepic/candy.gif";
import Game_2048 from "../../../assets/homepic/game_2048.gif";
import Sokoban from "../../../assets/homepic/sokoban.gif";
import Mario from "../../../assets/homepic/mario.gif";
import Detective from "../../../assets/img/projects/detective-demo.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";

export default function HomePage() {
  const images = [
    // { src: Game_2048, animation: "none", duration: 5000 },
    { src: Mario, animation: "fade", duration: 4400 },
    { src: Candy, animation: "fade", duration: 7000 },
    { src: Teris, animation: "fade", duration: 3800 },
    { src: Sokoban, animation: "fade", duration: 10000 },
    { src: Game_2048, animation: "fade", duration: 3000 },
    { src: Detective, animation: "fade", duration: 10000 },
    // { src: HomePic2, animation: "zoom", duration: 12000 },
    // { src: HomePic3, animation: "slide", duration: 16000 },
    // { src: HomePic8, animation: "fade", duration: 12000 },
    // { src: HomePic5, animation: "zoom", duration: 16000 },
    // { src: HomePic9, animation: "slide", duration: 12000 },
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
        <h1 className="extraBold">Game Arena</h1>
        <HeaderP>
          Who is the most intelligent LLM?
          <br/>
          Dive into our gaming agent and explore a variety of games, including AI vs. AI and Human vs. AI. 
        </HeaderP>
        <a
          href="https://www.roblox.com/share?code=7d09ddeb74a9034dbec6aa27bb0572a9&type=ExperienceDetails&stamp=1737092101410"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FullButton title="Try Now" />
        </a>
        {/* <SocialIcons>
          <a href="https://github.com/lmgame-org/GamingAgent" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="5x" />
          </a>
        </SocialIcons>
         */}

       
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
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  z-index: -1; /* Ensures it appears in the background */

  ${(props) =>
    props.isVisible &&
    props.animation !== "none" && // HomePic6 has no animation
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

// Black Transparency Overlay
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
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
  height: 100%;
  padding: 20px;

  h1 {
    font-size: 6rem;
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

const SocialIcons = styled.div`
  display: flex;
  gap: 40px;

  a {
    color: #fff; /* White icons */
    transition: color 0.3s;
    
    &:hover {
      color: #7620ff; /* Purple hover effect */
    }
  }
`;