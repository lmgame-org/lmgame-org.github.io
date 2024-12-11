import React from "react";
import styled from "styled-components";

export default function ImgBox({ img, title, text, action }) {
  return (
    <Wrapper onClick={action ? () => action() : null}>
      <ImgContainer>
        <img src={img} alt="project" />
        <Overlay>
          <h3>{title}</h3>
          <p>{text}</p>
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
  overflow: hidden; // Ensures zoomed image stays within bounds
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease; // Smooth zoom transition
  }
  &:hover img {
    transform: scale(1.02); // Zoom image slightly on hover
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
  background: rgba(0, 0, 0, 0.2); // Slightly darker background for better readability
  backdrop-filter: blur(5px);
  border-radius: 8px;
  width: 80%; // Increased width for better readability on smaller screens
  h3, p {
    padding: 0 10px; // Padding inside text elements
  }
  @media (max-width: 768px) {
    width: 90%; // More width in small screens
    h3 {
      font-size: 1rem; // Smaller font size for the title
    }
    p {
      font-size: 0.8rem; // Smaller font size for the paragraph
    }
  }
`;
