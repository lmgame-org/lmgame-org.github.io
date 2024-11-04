import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";


export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Contact US</h1>
            <p className="font13">
              For more information, feel free to join our discord group or follow us on twitter.
              <br />
              For our code details, please visit our github page and look into our paper. 
            </p>
          </HeaderInfo>
          <SocialIcons>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} size="3x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="3x" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="3x" />
            </a>
          </SocialIcons>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 120px;
  padding-top: 10px;

  a {
    color: #333;
    transition: color 0.3s;
    padding-bottom: 20px;

    &:hover {
      color: #7620ff;
    }
  }
`;








