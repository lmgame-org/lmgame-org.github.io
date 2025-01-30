import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import "../boards/style.css";
import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

import { BASE_URL } from "../../backend/config";

export default function Akinator() {
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
              <p className="font16">
                Players challenge the AI by having it guess objects based on a
                series of yes/no questions. The AI demonstrates deductive
                reasoning by deriving specific conclusions from general premises, while multi-hop reasoning is showcased as it connects sequential information to narrow down the possibilities to the correct answer.
              </p>
            </HeaderInfo>

            {/* Two Boards Side by Side */}
            <LeaderboardContainer>
              <BoardWrapper>
                <h2 className="font24 extraBold">Player Leaderboard</h2>
                <Board
                  apiEndpoint={`${BASE_URL}/api/akinator/players`}
                  columnnames={["Player Name", "Rank Score"]}
                />
              </BoardWrapper>

              <BoardWrapper>
                <h2 className="font24 extraBold">Model Leaderboard</h2>
                <Board
                  apiEndpoint={`${BASE_URL}/api/akinator/models`}
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

