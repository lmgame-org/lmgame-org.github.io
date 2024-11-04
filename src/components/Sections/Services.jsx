import React from "react";
import styled from "styled-components";
// Components
import ClientSlider from "../Elements/ClientSlider";
import Board from "../boards/board"
import '../boards/style.css'

export default function Services() {
  return (
    <Wrapper id="services">
      <div className="lightBg" style={{ padding: "10px 0" }}>
        <div className="container">
          <ClientSlider />
        </div>
      </div>
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Overall Leaderboard</h1>
            <p className="font13">
              This is overall leaderboard 
              <br />
              If you want tp see more in details, please keep scroll down.
            </p>
          </HeaderInfo>
          <Board/>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;


const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;