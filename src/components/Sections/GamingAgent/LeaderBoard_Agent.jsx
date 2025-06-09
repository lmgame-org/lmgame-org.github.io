import React from "react";
import styled from "styled-components";
// Components
import Board from "../../boards/board";
import OverallLeaderboard from "../../boards/aggregated_board";
import "../../boards/style.css";
import { BASE_URL } from '../../../backend/config';
import FullButton from "../../Buttons/FullButton";


export default function LeaderBoard_Agent() {
  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <a
                href="https://huggingface.co/spaces/lmgame/game_arena_bench"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FullButton title="Leaderboard" />
              </a>
            </div>

          </HeaderInfo>
{/* 
          <LeaderboardContainer>
            <BoardWrapperWide>
              <OverallLeaderboard />
            </BoardWrapperWide>
          </LeaderboardContainer> */}
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