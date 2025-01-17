import React from "react";
import styled from "styled-components";
import Slider from "react-slick"; // Import the slider library
import "slick-carousel/slick/slick.css"; // Slider styles
import "slick-carousel/slick/slick-theme.css";
// Components
import ProjectBox from "../Elements/ProjectBox";
// Assets
import ProjectImg1 from "../../assets/img/projects/ak1.png";
import ProjectImg2 from "../../assets/img/projects/bluffing.png";
import ProjectImg3 from "../../assets/img/projects/taboo.png";

import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  // Slider settings for continuous spinning
  const settings = {
    dots: false, 
    infinite: true, // Enable infinite loop
    speed: 1000, // Animation speed (in milliseconds)
    slidesToShow: 3, // Number of visible items
    slidesToScroll: 1, // Number of items to scroll at once
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Delay between slides (in milliseconds)
    pauseOnHover: true, // Prevent pausing on mouse hover
    cssEase: "linear", // Smooth animation for continuous spinning
  };

  return (
    <Wrapper id="projects">
      <div className="lightBg" style={{ padding: "40px 0" }}>
        <div className="container">

          {/* Carousel Wrapper */}
          <SliderWrapper>
            <Slider {...settings}>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg1}
                  title="Akinator"
                  text="Help AI guess the target object by answering yes/no questions."
                  action={() => navigate("/akinator")}
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg3}
                  title="Taboo"
                  text="Induce the AI to say the target word."
                  action={() => navigate("/taboo")}
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg2}
                  title="Bluffing"
                  text="Bluff the AI into believing the player's statements."
                  action={() => navigate("/bluffing")}
                />
              </StyledImageWrapper>
            </Slider>
          </SliderWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`;

const SliderWrapper = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;
