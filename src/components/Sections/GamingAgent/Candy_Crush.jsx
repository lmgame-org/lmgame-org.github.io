import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/BoardFlexible";
import "../../boards/style.css";
import TopNavbar from "../../Nav/TopNavbar";
import Footer from "../Footer";

import { BASE_URL } from "../../../backend/config";

export default function Candy_Crush() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Candy_Crush">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Candy Crush Leaderboard</h1>
              <p className="font16">
              Challenge the AI to match and strategize candies to reach high scores.
              </p>
            </HeaderInfo>

            
            <BoardWrapper>
            <Board
              title="Model Leaderboard"
              columnnames={["Model Name", "Score", "Steps"]}
              columnkeys={["model_name", "score", "steps"]}
              gamename="Candy Crush Game"
              leaderboardData={[
                { model_name: "o1", score: 97, steps: 25 },
                { model_name: "o3-mini-medium", score: 90, steps: 25 },
                { model_name: "Deepseek-R1", score: 91, steps: 25 },
                { model_name: "Claude 3.7", score: 35, steps: 25 },
                { model_name: "Gemini 2.0 flash thinking", score: 18, steps: 25 },
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

