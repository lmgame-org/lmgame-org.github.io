import React from "react";
import styled from "styled-components";
// Components
import Board from "../boards/board";
import "../boards/style.css";
import { BASE_URL} from '../../backend/config';

export default function Services() {
  return (
    <Wrapper id="services">
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Leaderboards</h1>
            <p className="font16" style={{ textAlign: 'left' }}>
              We have four leaderboards: one for each game and an overall leaderboard.
              <br />
              Player leaderboards can be found in the top tab. 
              <br />
              The overall rankings are calculated using the average scores across three games. 
            </p>
          </HeaderInfo>

          <LeaderboardContainer>
              <BoardWrapper>
                <Board
                  title="Akinator Model"
                  apiEndpoint={`${BASE_URL}/api/akinator/models`}
                  clickEnabled={false}
                  columnnames={["Model Name", "Rank Score"]}
                />
              </BoardWrapper>
              <BoardWrapper>
                <Board
                  title="Bluffing Model"
                  apiEndpoint={`${BASE_URL}/api/bluffing/models`}
                  clickEnabled={false}
                  columnnames={["Model Name", "Rank Score"]}
                />
              </BoardWrapper>
              <BoardWrapper>
                <Board
                  title="Taboo Model"
                  apiEndpoint={`${BASE_URL}/api/taboo/models`}
                  clickEnabled={false}
                  columnnames={["Model Name", "Rank Score"]}
                />
              </BoardWrapper>
              <BoardWrapper>
                <Board
                  title="Overall Leaderboard"
                  apiEndpoint={`${BASE_URL}/api/general/model`}  
                  columnnames={["Model Name", "Rank Score"]}
                  clickEnabled={false}
                />
              </BoardWrapper>
          </LeaderboardContainer>
        </div>
      </div>
    </Wrapper>
  );
}

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

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

