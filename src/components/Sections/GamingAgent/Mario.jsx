import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/BoardFlexible";
import "../../boards/style.css";
import TopNavbar from "../../Nav/TopNavbar";
import Footer from "../Footer";

import { BASE_URL } from "../../../backend/config";

export default function Mario() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Mario">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Mario Leaderboard</h1>
              <p className="font16">
              Ranking AI performance in a Mario game based on coins collected and levels completed.
              </p>
            </HeaderInfo>

            
            <BoardWrapper>
            <Board
              title="Model Leaderboard"
              columnnames={["Model Name", "Score", "Progress", "Time (s)"]}
              columnkeys={["model_name", "score", "progress", "time"]}
              gamename="Mario Game"
              leaderboardData={[
                { model_name: "Claude 3.7", score: "710", progress: "1-1", time: 64.2 },
                { model_name: "GPT 4o", score: "560", progress: "1-1", time: 58.6 },
                { model_name: "Gemini 2.0 flash", score: "320", progress: "1-1", time: 51.8 },
                { model_name: "GPT-4.5", score: "160", progress: "1-1", time: 62.8 },
                { model_name: "Claude 3.5 haiku", score: "140", progress: "1-1", time: 76.4 }
              ]}
            />

            </BoardWrapper>
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
  margin-top: 2.5em;
  margin-bottom: 40px;

  @media (max-width: 860px) {
    text-align: center;
  }
`;

const BoardWrapper = styled.div`
  flex: 1;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

