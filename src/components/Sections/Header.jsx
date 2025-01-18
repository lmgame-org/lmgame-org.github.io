import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FullButton from "../Buttons/FullButton";
// Assets
import HomePic2 from "../../assets/homepic/homepic2.jpg";
import HomePic3 from "../../assets/homepic/homepic3.jpg";
import HomePic1 from "../../assets/homepic/homepic1.jpg";

export default function Header() {
  const images = [HomePic2, HomePic3, HomePic1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Wrapper>
      <BackgroundImage src={images[currentImageIndex]} />
      <ContentWrapper>
        <h1 className="extraBold font60">Game Arena</h1>
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

// Styled Components
const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Adjust transparency: 0 = fully transparent, 1 = fully opaque */
    z-index: 0; /* Keep the overlay behind the text */
  }
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
  transition: background-image 1s ease-in-out; /* Smooth transition effect */
  z-index: -1; /* Ensures the background stays behind other elements */
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.9); /* Stronger and clearer shadow */
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const HeaderP = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9); /* Subtle text shadow */

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

