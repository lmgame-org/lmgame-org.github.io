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
import ProjectImg5 from "../../../assets/homepic/game_2048.gif";
import ProjectImg6 from "../../../assets/img/projects/detective-demo.gif";
import { useNavigate } from "react-router-dom";

// Custom Left Arrow
const PrevArrow = ({ onClick }) => {
  return <ArrowLeft onClick={onClick}>◀</ArrowLeft>;
};

// Custom Right Arrow
const NextArrow = ({ onClick }) => {
  return <ArrowRight onClick={onClick}>▶</ArrowRight>;
};

export default function Projects() {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    pauseOnHover: true,
    cssEase: "linear",
    prevArrow: <PrevArrow />, // Custom Left Arrow
    nextArrow: <NextArrow />, // Custom Right Arrow
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller
        settings: {
          slidesToShow: 2,
          
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          arrows: true, // Enable arrows for mobile
        },
      },
      {
        breakpoint: 480, // Small mobile
        settings: {
          slidesToShow: 1,
          arrows: true, // Ensure arrows are always there
        },
      },
    ],
  };

  return (
    <Wrapper id="projects">
      <div className="lightBg" style={{ padding: "20px 0" }}>
        <div className="container">
          <SliderWrapper>
            <Slider {...settings}>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg1}
                  title="Candy Crush"
                  // action={() => navigate("/candy_crush")}
                  text="Challenge the AI to match and strategize candies to reach high scores."
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg2}
                  title="Mario"
                  // action={() => navigate("/mario")}
                  text="Ranking AI performance in a Mario game based on coins collected and levels completed."
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg3}
                  title="Sokoban"
                  // action={() => navigate("/sokoban")}
                  text="Train the AI to solve box-pushing puzzles with smart movement planning."
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg4}
                  title="Tetris"
                  // action={() => navigate("/tetris")}
                  text="Let the AI stack and rotate pieces to clear lines and beat the clock."
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg5}
                  title="2048"
                  // action={() => navigate("/game_2048")}
                  text="Watch the AI combine tiles strategically to reach the 2048 goal."
                />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg6}
                  title="Ace Attorney"
                  // action={() => navigate("/game_2048")}
                  text="Watch the AI pressing witnesses and presenting evidence to expose contradictions."
                />
              </StyledImageWrapper>
            </Slider>
          </SliderWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

// Custom Arrow Styling
const ArrowLeft = styled.div`
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  color: #333;
  &:hover {
    color: #000;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  color: #333;
  &:hover {
    color: #000;
  }
`;

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
  position: relative;
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrapper = styled.section`
  width: 100%;
`;

