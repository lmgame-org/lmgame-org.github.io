import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="whiteBg">
        <ContentContainer className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Contact US</h1>
            <p className="font16" style={{ textAlign: 'left'}}>
              For more information, feel free to join our discord group or follow us on twitter.
              <br />
              For our code details, please visit our github page and look into our paper.
            </p>
          </HeaderInfo>
          <SocialIcons>
            <a href="https://discord.gg/jknCew2DcP" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} size="4x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="4x" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="4x" />
            </a>
          </SocialIcons>
        </ContentContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center; // Aligns children vertically in the center
  justify-content: space-between; // Distributes space between and around content items
  flex-wrap: wrap; // Allows items to wrap to the next line on smaller screens

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeaderInfo = styled.div`
  padding: 40px 0 30px 0;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 90px; // Reduced gap for aesthetics

  a {
    color: #333;
    transition: color 0.3s;
    &:hover {
      color: #7620ff;
    }
  }
`;
