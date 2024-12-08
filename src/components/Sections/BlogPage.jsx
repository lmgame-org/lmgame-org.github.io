import React from "react";
import { useParams } from "react-router-dom";
import MarkdownRenderer from "./MarkdownRenderer";
import TopNavbar from "./Pages/TopNavbar_pages";
import Footer from "./Footer";

import styled from "styled-components";

export default function BlogPage() {
  const { blogId } = useParams();
  const filePath = `/blogs/${blogId}.md`;

  return (

    <>
    <TopNavbar />
    <div id="top"></div>
    <Wrapper id="blog">
      <div className="whiteBg" style={{ padding: "90px 0" }}>
      <div style={{ padding: "20px" }}>
        <MarkdownRenderer filePath={filePath} />
      </div>
      </div>
    </Wrapper>
    <Footer />
    </>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
