import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
import ProjectBox from "../Elements/ProjectBox";

// Assets
import AISpaceEscapeCover from "../../assets/img/blogs/ai_space_escape.jpg";
import ProjectImg1 from "../../assets/img/blogs/blog1.png";
import ProjectImg2 from "../../assets/img/blogs/blog2.jpg";
import ProjectImg3 from "../../assets/img/blogs/blog3.jpg";

import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <Wrapper id="blog">
      <TopNavbar />
      <ContentSection>
        <HeaderInfo>
          <h1 className="font50 extraBold" style={{ padding: "50px 0" }}>Game Blogs</h1>
          <p className="font20">Here, we share our journey and reflections.</p>
        </HeaderInfo>

        <ProjectList>
          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={AISpaceEscapeCover} alt="AI Space Escape" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/ai_space_escape")}>AI Space Escape</PostTitle>
              <PostDescription>Project Overview</PostDescription>
            </TextWrapper>
          </ProjectItem>

          {/*<ProjectItem>
            <ImageWrapper>
              <StyledImage src={ProjectImg1} alt="Blog 1" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/blog1")}>Blog 1</PostTitle>
              <PostDescription>Some useful info</PostDescription>
            </TextWrapper>
          </ProjectItem>

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={ProjectImg2} alt="Blog 2" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/blog2")}>Blog 2</PostTitle>
              <PostDescription>Some review</PostDescription>
            </TextWrapper>
          </ProjectItem>

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={ProjectImg3} alt="Blog 3" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/blog3")}>Blog 3</PostTitle>
              <PostDescription>XXX</PostDescription>
            </TextWrapper>
          </ProjectItem> */}
        </ProjectList>
      </ContentSection>
      <Footer />
    </Wrapper>
  );
}

/* Styled Components */
const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 60px 0;
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 50px; /* Enlarged Title */
    font-weight: 700;
  }

  p {
    font-size: 20px; /* Enlarged Subtitle */
    color: #555;
  }
`;

const ProjectList = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* Increased spacing between posts */
`;

const ProjectItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: 400px; /* Ensures a consistent image height */
  object-fit: cover;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  margin-top: 20px;
`;

const PostTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  color: #007acc;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #005fa3;
  }
`;

const PostDescription = styled.p`
  font-size: 22px;
  color: #333;
  margin-top: 10px;
`;
