import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import '../boards/style.css';
import TopNavbar from "./Pages/TopNavbar_pages";
import Footer from "./Footer";

export default function Akinator() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState("player");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Akinator">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Akinator Leaderboard</h1>
              <p className="font13">
                Choose between the player leaderboard and model leaderboard for the Akinator game.
              </p>
              <ButtonContainer>
                <ToggleButton
                  isActive={selectedLeaderboard === "player"}
                  onClick={() => setSelectedLeaderboard("player")}
                >
                  Player Leaderboard
                </ToggleButton>
                <ToggleButton
                  isActive={selectedLeaderboard === "model"}
                  onClick={() => setSelectedLeaderboard("model")}
                >
                  Model Leaderboard
                </ToggleButton>
              </ButtonContainer>
            </HeaderInfo>
            {selectedLeaderboard === "player" ? (
              <Board title="Player Leaderboard" />
            ) : (
              <Board title="Model Leaderboard" />
            )}
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
  text-align: center;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#4CAF50" : "#ddd")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#45a049" : "#ccc")};
  }
`;
