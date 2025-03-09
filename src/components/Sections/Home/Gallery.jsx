import React from "react";
import styled from "styled-components";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// Components
import ProjectBox from "../../Elements/ProjectBox";
// Assets
import ProjectImg1 from "../../../assets/img/projects/candy_crush_o3_mini.gif";
import ProjectImg2 from "../../../assets/img/projects/mario_demo.gif";
import ProjectImg3 from "../../../assets/img/projects/sokoban_reasoning.gif";
import ProjectImg4 from "../../../assets/img/projects/tetris-demo.gif";

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
    autoplaySpeed: 9000, // Delay between slides (in milliseconds)
    pauseOnHover: true, // Prevent pausing on mouse hover
    cssEase: "linear", // Smooth animation for continuous spinning
  };

  return (
    <Wrapper id="projects">
      <div className="lightBg" style={{ padding: "20px 0" }}>
        <div className="container">

          {/* Carousel Wrapper */}
          <SliderWrapper>
            <Slider {...settings}>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg1}
                  title="Candy Crush"
                  text="Evaluating AI's ability to recognize patterns and optimize moves in a match-three puzzle."
                  // action={() => navigate("/akinator")}
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg2}
                  title="Mario"
                  text="Testing AI's reaction speed and decision-making in a platformer environment."
                  // action={() => navigate("/bluffing")}
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg3}
                  title="Sokoban"
                  text="Assessing AI's strategic planning and problem-solving in a push-box puzzle game."
                  // action={() => navigate("/taboo")}
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg4}
                  title="Tetris"
                  text="Measuring AI's efficiency in spatial awareness and real-time adaptability."
                  // action={() => navigate("/bluffing")}
                />
              </StyledImageWrapper>
            </Slider>
          </SliderWrapper>
        </div>
      </div>
    </Wrapper>
  );
}



const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
`;