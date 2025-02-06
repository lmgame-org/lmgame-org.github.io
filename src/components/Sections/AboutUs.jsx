import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

// Assets
import Image1 from "../../assets/img/bgs/b2.jpg";
import Image2 from "../../assets/img/bgs/b3.jpg";
import Image3 from "../../assets/img/bgs/b4.jpg";

export default function AboutUs() {
  return (
    <Wrapper id="AboutUs">
      <TopNavbar />
      <ContentSection>
        <div className="container">
          <HeaderContainer>
            <HeaderInfo>
              <h1 className="font40 extraBold">About Us</h1>
              <CenterText>
                <p>
                  Game Arena is a crowdsourcing platform that hosts live computer games to evaluate AI models. 
                  As a team of passionate researchers from UC San Diego and UC Berkeley, we design and maintain 
                  gamified AI benchmarks using rigorous scientific methods.
                </p>
              </CenterText>
              <CenterText>
                <p>
                  We are a vibrant and growing community, and we welcome anyone interested in collaborating with us! 
                  Feel free to reach out at 
                  <EmailLink href="mailto:largemodelgame@gmail.com"> largemodelgame@gmail.com</EmailLink>.
                </p>
              </CenterText>

              <Text>
                <strong>Advisors:</strong> HaoJian Jin, Ion Stoica, Hao Zhang.
              </Text>
              <Text>
                <strong>Members:</strong> Anze Xie, Haoyang Yu, Jason Kong, Jessica Zhang, Lanxiang Hu, 
                Qiyu Li, Tony Meng, Yuxuan Zhang.
              </Text>
            </HeaderInfo>
          </HeaderContainer>
        </div>
      </ContentSection>
      <Footer />
    </Wrapper>
  );
}

/* Styling */
const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa; /* Light grey background */
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeaderInfo = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    margin-bottom: 20px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  text-align: left;
  margin-bottom: 15px;
`;

const CenterText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  text-align: justify;
  margin-bottom: 15px;
`;

const EmailLink = styled.a`
  color: #007acc;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #005fa3;
    text-decoration: underline;
  }
`;