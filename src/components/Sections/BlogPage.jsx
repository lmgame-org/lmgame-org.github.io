import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MarkdownRenderer from "./MarkdownRenderer";
import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

export default function BlogPage() {
  const { blogId } = useParams();
  const filePath = `/blogs/${blogId}.md`;

  return (
    <>
      <TopNavbar />
      <Wrapper id="blog">
        <WhiteBg>
          <Container>
            <MarkdownWrapper>
              <MarkdownRenderer filePath={filePath} />
            </MarkdownWrapper>
          </Container>
        </WhiteBg>
      </Wrapper>
      <Footer />
    </>
  );
}

/* ---------- Styled Components ---------- */

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh; /* Ensures it covers the full viewport height */
  display: flex;
  flex-direction: column;
`;

const WhiteBg = styled.div`
  background-color: #ffffff;
  flex-grow: 1; /* Makes sure it expands to fill available space */
  padding: 120px 0;
`;


const Container = styled.div`
  max-width: 1200px; 
  margin: 0 auto;   
  padding: 0 50px;  
`;

const MarkdownWrapper = styled.div`
  font-size: 20px;  
  line-height: 1.8; 
  color: #333;
  margin: 0 auto;
  width: 100%;
  max-width: 900px; 
  text-align: justify;

  /* No extra spacing for h1 (#) */
  h1 {
    margin-top: 0.5em;
    margin-bottom: 1em;
    font-size: 2.2rem;
    line-height: 1.3;
  }

  /* Larger spacing only for h2 (##) */
  h2 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-size: 2rem;
    line-height: 1.4;
  }

  /* Larger spacing only for h3 (###) */
  h3 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: 1.8rem;
    line-height: 1.4;
  }
`;
