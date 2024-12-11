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
  position: absolute; /* Positions the overlay on top of the image */
  top: 50%; /* Start at the vertical center */
  left: 50%; /* Start at the horizontal center */
  transform: translate(-50%, -50%); /* Center the overlay by shifting it */
  width: 80%; /* Width relative to the image */
  height: 40%; /* Height relative to the image */
  display: flex;
  flex-direction: column; /* Aligns title and description */
  justify-content: center; /* Centers content vertically */
  align-items: center; /* Centers content horizontally */
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.3); /* Adds a semi-transparent background */
  backdrop-filter: blur(2px); /* Optional: adds a blur effect */
  border-radius: 8px; /* Matches the image's border radius */
  transition: opacity 0.3s ease; /* Smoothly transition overlay visibility */
  opacity: 1; /* Initially visible */
`;

const Title = styled.h3`
  margin: 0;
  padding: 0 10px;
  font-size: 1rem; /* Increased base font size */
  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size for mobile devices */
  }
`;

const Description = styled.p`
  margin-top: 5px;
  padding: 0 10px;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    font-size: 0.9rem; /* Slightly smaller font size for descriptions on mobile */
  }
`;
