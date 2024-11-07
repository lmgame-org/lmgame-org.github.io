import React from "react";
import styled from "styled-components";

export default function ImgBox({ img, title, text, action }) {
  return (
    <Wrapper onClick={action ? () => action() : null}>
      <ImgContainer>
        <img src={img} alt="project" />
        <Overlay>
          <h3 className="font20 extraBold">{title}</h3>
          <p className="font13">{text}</p>
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
  overflow: hidden; /* Ensures zoomed image stays within bounds */
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    transition: transform 0.3s ease; /* Smooth zoom transition */
  }
  &:hover img {
    transform: scale(1.02); /* Zoom image slightly on hover */
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
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  width: 50%;
  h3 {
    margin: 0;
  }
  p {
    margin: 5px 0 0;
  }
`;
