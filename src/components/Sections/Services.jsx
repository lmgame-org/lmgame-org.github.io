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
            <h1 className="font40 extraBold">Overall Leaderboard</h1>
            <p className="font16" style={{ textAlign: 'left' }}>
              This leaderboard displays the overall rankings, calculated using the average scores across three games.
            </p>
          </HeaderInfo>
          <Board
            title="Overall Leaderboard"
            apiEndpoint={`${BASE_URL}/api/general/model`}  
            columnnames={["Model Name", "Rank Score"]}
            clickEnabled={false}
          />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

