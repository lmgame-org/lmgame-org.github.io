import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/BoardFlexible";
import "../../boards/style.css";
import TopNavbar from "../../Nav/TopNavbar";
import Footer from "../Footer";

import { BASE_URL } from "../../../backend/config";

export default function Tetris() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNavbar />
      <div id="top"></div>
      <Wrapper id="Tetris">
        <div className="whiteBg" style={{ padding: "90px 0" }}>
          <div className="container">
            <HeaderInfo>
              <h1 className="font40 extraBold">Tetris Leaderboard</h1>
              <p className="font16">
              Model rankings in Tetris (with complete (C) and planning-only (P), where each block doesn't fall until command actions are executed, variants).
              </p>
            </HeaderInfo>

            
            <BoardWrapper>
            <Board
              title="Model Leaderboard"
              columnnames={["Model Name", "Tetris (C) Score", "Tetris (C) Steps	", "Tetris (P) Score", "Tetris (P) Steps"]}
              columnkeys={["model_name", "Tetris_C_S", "Tetris_C_Steps", "Tetris_P_Score", "Tetris_P_Steps"]}
              gamename="Tetris Game"
              leaderboardData={[
                { model_name: "Claude 3.7", Tetris_C_S: "95", Tetris_C_Steps: 27, Tetris_P_Score: 110,Tetris_P_Steps: 29},
                { model_name: "Claude 3.5 haiku", Tetris_C_S: "90", Tetris_C_Steps: 25, Tetris_P_Score: 92 ,Tetris_P_Steps: 25},
                { model_name: "Gemini 2.0 flash", Tetris_C_S: "82", Tetris_C_Steps: 23, Tetris_P_Score: 87, Tetris_P_Steps: 24 },
                { model_name: "GPT 4o", Tetris_C_S: "54", Tetris_C_Steps: 19, Tetris_P_Score: 56, Tetris_P_Steps: 20 }
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

