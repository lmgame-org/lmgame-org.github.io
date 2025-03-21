import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/BoardFlexible";
import "../../boards/style.css";
import TopNavbar from "../../Nav/TopNavbar";
import Footer from "../Footer";

import { BASE_URL } from "../../../backend/config";

export default function Sokoban() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Sokoban">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Sokoban Leaderboard</h1>
              <p className="font16">
              Train the AI to solve box-pushing puzzles with smart movement planning.
              </p>
            </HeaderInfo>

            
            <BoardWrapper>
            <Board
              title="Model Leaderboard"
              columnnames={["Model Name", "Level Cracked", "Steps"]}
              columnkeys={["model_name", "level", "steps"]}
              gamename="Sokoban Game"
              leaderboardData={[
                { model_name: "o3-mini-medium", level: "2 (3)", steps: "[20, 51, 70, 91]" },
                { model_name: "Claude 3.7 thinking", level: "1 (2)", steps: "[16,38]" },
                { model_name: "Deepseek-R1", level: "1 (1)", steps: "[17,39]" },
                { model_name: "Gemini 2.0 flash thinking", level: "0", steps: "	[17]" },
                { model_name: "Claude 3.7", level: "0", steps: "[37]" },
                { model_name: "GPT 4o", level: "0", steps: "[113]" },
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

