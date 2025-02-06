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
      <div className="whiteBg" style={{ padding: "120px 0", flex: 1, display: "flex", flexDirection: "column" }}>


        <div className="container" style={{ flex: 1 }}>

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
                text="Project Overview"
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
const BlogContainer = styled.div`
  display: flex;
  justify-content: center;  // Center items horizontally
  align-items: center;      // Align items vertically
  flex-wrap: wrap;          // Allow responsive wrapping
  gap: 30px;                // Space between items

  @media (max-width: 768px) {
    flex-direction: column; // Stack items on smaller screens
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

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
`;


const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px; // Adds spacing below the title
`;
