import React, { useState } from "react";
import styled from "styled-components";
// Components
import ImgBox from "../Elements/ImgBox";

// Assets
import Image1 from "../../assets/img/bgs/b2.jpg";
import Image2 from "../../assets/img/bgs/b3.jpg";

import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();
  return (
    <Wrapper id="AboutUs">
      <div className="lightBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderContainer className="flexCenter">
            <HeaderInfo>
              <h1 className="font40 extraBold">About Us</h1>
              <p className="font16">
                GameArena's mission is to enhance the understanding and assessment of large language models by engaging them in strategic games that test their reasoning skills, promoting deeper AI research and user interaction through an escape game that builds on Roblox.
              </p>
            </HeaderInfo>
          </HeaderContainer>
          <div className="row textCenter">
            <StyledImageWrapper>
              <ImgBox img={Image1} title="Our Mission" text="Learn more about Game Arena" action={() => navigate("/ourmission")}/>
              <ImgBox img={Image2} title="Game Reasoning Skills" text="Discover more details about our games." action={() => navigate("/gameskills")}/>
            </StyledImageWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  img {
    width: 90%; /* Sets image width to 90% of the container */
    height: auto; /* Maintains aspect ratio */
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
