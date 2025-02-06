import React, { useEffect } from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import "../boards/style.css";
import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

import { BASE_URL } from "../../backend/config";

export default function Bluffing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Bluffing">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Bluffing Leaderboard</h1>
              <p className="font16">
                The Bluffing game challenges the AI's inductive reasoning by having it determine the truthfulness of statements made by players based on observed responses. The AI uses multi-hop reasoning to connect these observations and formulate a logical conclusion about the player's honesty.
              </p>
            </HeaderInfo>

            {/* Two Boards Side by Side */}
            <LeaderboardContainer>
              <BoardWrapper>
                <Board
                  title="Player Leaderboard"
                  apiEndpoint={`${BASE_URL}/api/bluffing/players`}
                  columnnames={["Player Name", "Rank Score"]}
                  gamename = "Bluffing Game"
                />
              </BoardWrapper>

              <BoardWrapper>
                <Board
                  title="Model Leaderboard"
                  apiEndpoint={`${BASE_URL}/api/bluffing/models`}
                  clickEnabled={false}
                  columnnames={["Model Name", "Rank Score"]}
                />
              </BoardWrapper>
            </LeaderboardContainer>
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
  margin-bottom: 40px;

  @media (max-width: 860px) {
    text-align: center;
  }
`;

const LeaderboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px; /* Space between the leaderboards */
  margin-top: 40px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const BoardWrapper = styled.div`
  flex: 1;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;
