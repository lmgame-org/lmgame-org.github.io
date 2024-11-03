import React from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import '../boards/style.css';
import TopNavbar from "./Pages/TopNavbar_pages";
import Footer from "./Pages/Footer_akinator"

export default function Akinator() {
  return (
    <>
      <TopNavbar />
      <Wrapper id="Akinator">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Akinator Player Leaderboard</h1>
              <p className="font13">
                This is Akinator player Leaderboards.
              </p>
            </HeaderInfo>
            <Board />
          </div>
        </div>
      </Wrapper>
      <Wrapper id="Akinator2">
        <div className="lightBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Akinator Model Leaderboard</h1>
              <p className="font13">
                This is Akinator model Leaderboards.
              </p>
            </HeaderInfo>
            <Board />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
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
