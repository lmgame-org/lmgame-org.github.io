
import React, { useState } from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../../Elements/ProjectBox";
import FullButton from "../../Buttons/FullButton";
// Assets
import ProjectImg1 from "../../../assets/img/projects/ak1.png";
import ProjectImg2 from "../../../assets/img/projects/bluffing.png";
import ProjectImg3 from "../../../assets/img/projects/taboo.png";

import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <Wrapper id="projects">
      <div className="lightBg" style={{ padding: "20px 0" }}>
      <div className="container">
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg1}
                title="Akinator"
                text="Help AI guess the target object by answering yes/no questions."
                action={() => navigate("/akinator")}
              />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg3}
                title="Taboo"
                text="Induce the AI to say the target word."
                action={() => navigate("/taboo")}
              />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg2}
                title="Bluffing"
                text="Bluff the AI into believing the player's statements."
                action={() => navigate("/bluffing")}
              />
              </StyledImageWrapper>
            </div>
          </div>
          </div>
      </div>
    </Wrapper>
  );
}

const StyledImageWrapper = styled.div`
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
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

const ButtonWrapper = styled.div`
  position: relative;
  margin-left: auto;
  width: 200px;
  @media (max-width: 860px) {
    margin: 20px 0 0 0;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1000;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #f1f1f1;
  }
`;


