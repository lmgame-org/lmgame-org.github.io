import React from "react";
import styled from "styled-components";

export default function ImgBox({ img, title, text, action }) {
  return (
    <Wrapper onClick={action ? () => action() : null}>
      <ImgContainer>
        <StyledImage src={img} alt="project" />
        <TextContainer>
          <p className="font18"><strong>{title}</strong></p>
          <p className="font16">{text}</p>

        </TextContainer>
      </ImgContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const TextContainer = styled.div`
  position: absolute;
  text-align: center;
  color: black;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 8px;

`;
