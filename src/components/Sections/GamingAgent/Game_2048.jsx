import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/BoardFlexible";
import "../../boards/style.css";
import TopNavbar from "../../Nav/TopNavbar";
import Footer from "../Footer";

import { BASE_URL } from "../../../backend/config";

export default function Game_2048() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Game_2048">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Game 2048 Leaderboard</h1>
              <p className="font16">
               Watch the AI combine tiles strategically to reach the 2048 goal.
              </p>
            </HeaderInfo>

            
            <BoardWrapper>
            <Board
              title="Model Leaderboard"
              columnnames={["Model Name", "Score", "Steps", "Time (mins)"]}
              columnkeys={["model_name", "score", "steps", "time"]}
              gamename="2048 Game"
              leaderboardData={[
                { model_name: "Claude 3.7 thinking", score: 256, steps: 25, time: '>200'},
                { model_name: "o1", score: 256, steps: 116, time: '>200'},
                { model_name: "o3-mini-medium", score: 256, steps: 119, time: '>200' },
                { model_name: "Claude 3.7", score: 256, steps: 130, time: '~20' },
                { model_name: "Gemini 2.0 flash", score: 128, steps:111, time: '~18' },
                { model_name: "Gemini 2.0 flash thinking", score: 128, steps: 132, time: '>100' },
                { model_name: "Claude 3.5 haiku", score: 128, steps: 151, time: '~1' },
                { model_name: "GPT-4.5", score: 34, steps: 34, time: '~8' },
                { model_name: "GPT 4o", score: 16, steps: 21, time: '~1' }
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

