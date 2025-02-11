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
              <h1 className="font40 extraBold">About</h1>
              <CenterText>
                <p>
                  Game Arena hosts live computer games for AI evaluations. 
                  As a team of passionate researchers from UC San Diego, we design and maintain 
                  gamified AI benchmarks.
                </p>
              </CenterText>
              <CenterText>
                <p>
                  Our mission is to enable engaging gameplay while evaluating a variety of 
                  large-scale AI models and systems.
                  We also seek to redefine the role of humans in data annotation and evaluation,
                  in anticipation of a future shaped by superintelligence.
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
                <strong>Members:</strong> Lanxiang Hu, Jason Kong, Qiyu Li, Tony Meng, Anze Xie, Haoyang Yu, Jessica Zhang, Yuxuan Zhang.
              </Text>
              
              <Text>
                <strong>Advisors:</strong> HaoJian Jin, Tajana Rosing, Ion Stoica, Hao Zhang.
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
  justify-content: left;
  align-items: left;
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
  margin-top: 2.5em;
  padding: 20px;

  h1 {
    font-size: 50px; /* Enlarged Title */
    font-weight: 700;
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
  text-align: left;
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