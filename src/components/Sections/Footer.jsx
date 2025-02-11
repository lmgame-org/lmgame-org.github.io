import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub, faTwitter, faTiktok} from "@fortawesome/free-brands-svg-icons";
// Assets
import Logo from "../../assets/svg/Logo";

export default function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="darkBg">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            {/* Logo and Brand Name */}
            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
              <Logo darkMode={true}/>
              <h1 className="font16 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                Game Arena
              </h1>
            </Link>

      

            {/* Copyright and Back to Top Link */}
            <StyleP className="whiteColor font16">
              © {getCurrentYear()} - <span className="purpleColor font16">Game Arena</span> All Rights Reserved
            </StyleP>

            {/* Social Media Icons */}
            <SocialIcons>
              <a href="https://discord.gg/jknCew2DcP" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} size="2x" />
              </a>
              <a href="https://x.com/largemodelgame" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://github.com/lmgame-org" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </SocialIcons>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 40px;

  a {
    color: #fff; /* White icons */
    transition: color 0.3s;
    
    &:hover {
      color: #7620ff; /* Purple hover effect */
    }
  }
`;

const StyleP = styled.p`
  @media (max-width: 500px) {
    margin: 20px 0;
  }
`;
