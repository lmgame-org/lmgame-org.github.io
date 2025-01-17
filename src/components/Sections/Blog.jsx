import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Components
import ProjectBox from "../Elements/ProjectBox";
// Assets
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
            <p className="font16" style={{ textAlign: 'left' }}>
              Here are some great blogs we have.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg1}
                  title="Blog 1"
                  text="Some useful info"
                  action={() => navigate("/blog/blog1")}
                />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg2}
                  title="Blog 2"
                  text="Some review"
                  action={() => navigate("/blog/blog2")}
                />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <StyledImageWrapper>
                <ProjectBox
                  img={ProjectImg3}
                  title="Blog 3"
                  text="XXX"
                  action={() => navigate("/blog/blog3")}
                />
              </StyledImageWrapper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}

const StyledImageWrapper = styled.div`
  img {
    width: 300px;
    height: 230px;
    object-fit: cover;
  }
`;

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
