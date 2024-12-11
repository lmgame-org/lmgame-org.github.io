import React from "react";
import styled from "styled-components";

export default function ImgBox({ img, title, text, action }) {
  return (
    <Wrapper onClick={action ? () => action() : null}>
      <ImgContainer>
        <StyledImage src={img} alt="project" />
        <Overlay>
          <Title>{title}</Title>
          <Description>{text}</Description>
        </Overlay>
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
  overflow: hidden; /* Ensures the overlay stays within the image bounds */
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02); /* Scale image on hover for a slight zoom effect */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3); /* Increased opacity for better text contrast */
  backdrop-filter: blur(5px);
  border-radius: 8px;
  width: 80%; /* Constant width relative to the parent image container */
  box-sizing: border-box; /* Includes padding in the width calculation */
  max-width: 80%; /* Ensures overlay does not exceed the image width */
  @media (max-width: 768px) {
    width: 80%; /* Optionally, increase width for smaller screens */
  }
`;

const Title = styled.h3`
  margin: 0;
  padding: 0 10px;
  font-size: 1.2rem; /* Increased base font size */
  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for mobile devices */
  }
`;

const Description = styled.p`
  margin-top: 5px;
  padding: 0 10px;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller font size for descriptions on mobile */
  }
`;
