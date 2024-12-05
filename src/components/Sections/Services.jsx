import React, { useState } from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import "../boards/style.css";

export default function Services() {
  const [selectedLeaderboard, setSelectedLeaderboard] = useState("overall");

  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Overall Leaderboard</h1>
            <p className="font13">
              This is overall leaderboard 
              <br />
              If you want to see more in details, please keep scroll down.
            </p>
            <ButtonContainer>
              <ToggleButton
                isActive={selectedLeaderboard === "overall"}
                onClick={() => setSelectedLeaderboard("overall")}
              >
                Overall Leaderboard
              </ToggleButton>
              <ToggleButton
                isActive={selectedLeaderboard === "player"}
                onClick={() => setSelectedLeaderboard("player")}
              >
                Player Leaderboard
              </ToggleButton>
            </ButtonContainer>
          </HeaderInfo>
          {selectedLeaderboard === "player" ? (
              <Board
                title="Overall Player Leaderboard"
                apiEndpoint="/api/general/player"
              />
            ) : (
              <Board
                title="Overall Leaderboard"
                apiEndpoint="/api/general/rank"
                clickEnabled={false}
              />
            )}
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
