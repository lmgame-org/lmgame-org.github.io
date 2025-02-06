import React, { useEffect } from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import "../boards/style.css";
import Footer from "./Footer";
import { BASE_URL } from "../../backend/config";
import TopNavbar from "../Nav/TopNavbar";

export default function Taboo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Taboo">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Taboo Leaderboard</h1>
              <p className="font16">
                The player tries to induce the AI into saying the target word without directly mentioning it. If the AI says the target word, the player wins. The AI employs abductive reasoning to generate hypotheses from fragmented clues, trying to guess the secret word while avoiding saying it directly. The game tests the AI's ability to infer under conditions of uncertainty and ambiguity, utilizing multi-hop reasoning to connect information provided by the player.
              </p>
            </HeaderInfo>

            {/* Two Boards Side by Side */}
            <LeaderboardContainer>
              <BoardWrapper>
                <Board
                  title="Player Leaderboard"
                  apiEndpoint={`${BASE_URL}/api/taboo/players`}
                  columnnames={["Player Name", "Rank Score"]}
                />
              </BoardWrapper>

              <BoardWrapper>
                <Board
                  title="Model Leaderboard"
                  apiEndpoint={`${BASE_URL}/api/taboo/models`}
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
