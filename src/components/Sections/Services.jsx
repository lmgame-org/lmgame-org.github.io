import React from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import OverallLeaderboard from "../boards/aggregated_board";
import "../boards/style.css";
import { BASE_URL } from '../../backend/config';

export default function Services() {
  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold" style={{ textAlign: 'center' }}>Leaderboards</h1>
            <p className="font16" style={{ textAlign: 'center' }}>
              We have four rankings: one for each game and an overall ranking.
              <br />
              Player leaderboards can be found in the top tab. 
              <br />
              The overall ranking is calculated using the average scores across three games. 
            </p>
          </HeaderInfo>

          <LeaderboardContainer>
            <BoardWrapperWide>
              <OverallLeaderboard />
            </BoardWrapperWide>
          </LeaderboardContainer>
        </div>
      </div>
    </Wrapper>
  );
}

const LeaderboardContainer = styled.div`
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
  max-width: 2400px
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const BoardWrapperWide = styled.div`
  width: 100%;
  max-width: 2400px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  max-width: 2400px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderInfo = styled.div`
  @media (max-width: 1000px) {
    text-align: center;
  }
`;