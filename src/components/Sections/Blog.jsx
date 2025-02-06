import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Components
import ProjectBox from "../Elements/ProjectBox";
// Assets
import AISpaceEscapeCover from "../../assets/img/blogs/trimmed_ai_space_escape.jpg"
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
      <div className="whiteBg" style={{ padding: "120px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Game Blogs</h1>
            <p className="font16">
            Here, we share our journey and reflections.
            </p>
          </HeaderInfo>

          {/* Centered Blog Section */}
          <BlogContainer>
          <StyledImageWrapper>
              <ProjectBox
                img={AISpaceEscapeCover}
                title="AI Space Escape"
                text="Developer Diary 1"
                action={() => navigate("/blog/ai_space_escape")}
              />
            </StyledImageWrapper>

            {/* <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg1}
                title="Blog 1"
                text="Some useful info"
                action={() => navigate("/blog/blog1")}
              />
            </StyledImageWrapper>

            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg2}
                title="Blog 2"
                text="Some review"
                action={() => navigate("/blog/blog2")}
              />
            </StyledImageWrapper>

            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg3}
                title="Blog 3"
                text="XXX"
                action={() => navigate("/blog/blog3")}
              />
            </StyledImageWrapper> */}
          </BlogContainer>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}

// Center the images inside the Blog section
const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh; // Ensures it fills the screen
  display: flex;
  flex-direction: column;
  padding: 0; // Remove any extra padding
  margin: 0; // Remove unnecessary margins
`;

const BlogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%; // Ensure it takes full width
  max-width: 1200px; // Restrict maximum width for better readability
  margin: auto; // Center content properly
  padding: 0; // Remove extra padding

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledImageWrapper = styled.div`
  text-align: center; // Ensure text under images is centered
  img {
    width: 300px;
    height: 230px;
    object-fit: cover;
  }
`;


const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px; // Adds spacing below the title
`;
