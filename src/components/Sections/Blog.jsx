import React from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
// Assets
import ProjectImg1 from "../../assets/img/blogs/blog1.png";
import ProjectImg2 from "../../assets/img/blogs/blog2.jpg";
import ProjectImg3 from "../../assets/img/blogs/blog3.jpg";

import TestimonialSlider from "../Elements/TestimonialSlider";

export default function Projects() {
  return (
    <Wrapper id="blog">
      <div className="whiteBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Game Blogs</h1>
            <p className="font13">
              Here are some great blogs we have, try to create some by yourself! Sent to us by Discord.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg1}
                title="Video1"
                text="Defeat XXX"
                action={() => alert("clicked")}
              />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg2}
                title="Video2"
                text="Escape room #99"
                action={() => alert("clicked")}
              />
              </StyledImageWrapper>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <StyledImageWrapper>
              <ProjectBox
                img={ProjectImg3}
                title="Video3"
                text="XXX"
                action={() => alert("clicked")}
              />
              </StyledImageWrapper>
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" action={() => alert("clicked")} />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg">
      </div>
      <div className="lightBg" style={{padding: '50px 0'}}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">What They Say?</h1>
            <p className="font13">
              Game review from others.
            </p>
          </HeaderInfo>
          <TestimonialSlider />
        </div>
      </div>
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
