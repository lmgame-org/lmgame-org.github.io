import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Assets
import AISpaceEscapeCover from "../../assets/img/blogs/01_ai_space_escape.jpg";
import GamingAgentCover from "../../assets/img/blogs/02_gaming_agent_intro.png";
import LMGameBenchCover from "../../assets/img/blogs/03_lmgame_bench_cover.png";
import PokemonRedCover from "../../assets/img/blogs/04_pokemon_red_cover.png";
import LMGameUseCover from "../../assets/img/blogs/05_harness.png";
import GRLCover from "../../assets/img/blogs/06_example_validation_success_curves.png";

import TopNavbar from "../Nav/TopNavbar";
import Footer from "./Footer";

export default function Projects() {
  const navigate = useNavigate();
  const [expandedPost, setExpandedPost] = useState(null);

  const togglePostDescription = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <Wrapper id="blog">
      <TopNavbar />
      <ContentSection>
        <HeaderInfo>
          <h1 className="font40 extraBold">Game Blogs</h1>
          <p className="font20">Here, we share our journey and reflections.</p>
        </HeaderInfo>

        <ProjectList>

          {/* Repeat below for other projects with the same TLDR support */}

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={GRLCover} alt="grl" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/grl")}>Can RL-based LLM post-training on games generalize to other tasks? (GRL)</PostTitle>
              <PostDescription>
                <TLDR onClick={() => togglePostDescription(2)}>
                  {expandedPost === 2 ? "Hide TLDR" : "Show TLDR"}
                </TLDR>
                {expandedPost === 2 && (
                  <FullDescription>
                    Post-training LLMs on games (Sokoban, Tetris) improves same-family variants (≈ +2–56%) and shows smaller gains on related tasks (Blocksworld +3–7%, WebShop ~+6% but unstable); no improvement on GSM8K. We introduce GRL, an agent-centric, multi-turn RL framework that makes LLM–environment interaction highly customizable for systematic generalization studies.
                  </FullDescription>
                )}
              </PostDescription>
            </TextWrapper>
          </ProjectItem>

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={LMGameUseCover} alt="lmgame_use" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/lmgame_use")}>A Practical Guideline to Using Lmgame-Bench</PostTitle>
              <PostDescription>
                <TLDR onClick={() => togglePostDescription(1)}>
                  {expandedPost === 1 ? "Hide TLDR" : "Show TLDR"}
                </TLDR>
                {expandedPost === 1 && (
                  <FullDescription>
                    This guideline contains a detailed overview of the repository setup of Lmgame-Bench as well as how to use it for evaluation as well as the integration of new games. It covers the process of evaluation in the single/multi-agent mode as well as the various LLMs that you can use.
                  </FullDescription>
                )}
              </PostDescription>
            </TextWrapper>
          </ProjectItem>

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={PokemonRedCover} alt="pokemon_red" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/pokemon_red")}>From Pokémon Red to Standardized Game-as-an-Eval</PostTitle>
              <PostDescription>
                <TLDR onClick={() => togglePostDescription(0)}>
                  {expandedPost === 0 ? "Hide TLDR" : "Show TLDR"}
                </TLDR>
                {expandedPost === 0 && (
                  <FullDescription>
                    Pokémon is increasingly used to evaluate modern large language models, but current practices lack standardization, depend heavily on game-specific scaffolding, and are costly. We address these issues with lmgame-bench, a new framework offering standardized evaluations and initial results across diverse games.
                  </FullDescription>
                )}
              </PostDescription>
            </TextWrapper>
          </ProjectItem>


          {/* Legacy Blogs */}
          
          {/*

          <ProjectItem>
            <ImageWrapper>
              <StyledImage src={AISpaceEscapeCover} alt="AI Space Escape" />
            </ImageWrapper>
            <TextWrapper>
              <PostTitle onClick={() => navigate("/blog/ai_space_escape")}>Introducing AI Space Escape: Playing Games While Evaluting LLM Reasonsing!</PostTitle>
              <PostDescription>
                <TLDR onClick={() => togglePostDescription(0)}>
                  {expandedPost === 0 ? "Hide TLDR" : "Show TLDR"}
                </TLDR>
                {expandedPost === 0 && (
                  <FullDescription>
                    We developed a live Roblox game, AI Space Escape, powered by state-of-the-art large language models (LLMs), offering a unique experience to reason with AI. Beyond entertainment, our game generates gaming data for evaluating AI reasoning abilities in real-world scenarios, extending beyond math and coding benchmarks. All gaming data, evaluation scripts, and code are publicly available for further research.
                  </FullDescription>
                )}
              </PostDescription>
            </TextWrapper>
          </ProjectItem>

          */}

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
  padding: 80px 20px;
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-top: 2.5em;
  margin-bottom: 40px;

  h1 {
    font-size: 50px;
    font-weight: 700;
  }

  p {
    font-size: 20px;
    color: #555;
  }
`;

const ProjectList = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
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
  height: 400px;
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

const TLDR = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #dd00dd; /* Magenta */
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #aa00aa; /* Darker magenta */
  }
`;

const FullDescription = styled.div`
  font-size: 18px;
  color: #555;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: justify;
`;