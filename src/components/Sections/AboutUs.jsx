import React, { useState } from "react";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";

export default function AboutUs() {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Wrapper id="AboutUs">
      <div className="lightBg" style={{ padding: "40px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Mission</h1>
            <p className="font13">
              GameArena's mission is to enhance the understanding and assessment of large language models by engaging them in strategic games that test their reasoning skills, promoting deeper AI research and user interaction through a escape game that build on Roblox.
              <br />
            </p>
          </HeaderInfo>
          <div className="row flexCenter">
            <div style={{ margin: "30px 0", width: "200px" }}>
              <FullButton title={showMore ? "Show Less" : "Learn More"} action={handleLearnMore} />
            </div>
          </div>
          {showMore && (
            <MoreContent>
              <p className="font13">
              At GameArena, our mission is to redefine the evaluation of large language models (LLMs) by merging rigorous scientific testing with interactive gameplay. We have integrated our specially designed games—Akinator, Taboo, and Bluffing—each tailored to assess distinct reasoning capabilities like deductive, inductive, and abductive reasoning, into the Roblox platform to form an escape game. This setup tests and hones both AI and human intelligence in a dynamic environment. Our goal is to advance our understanding of AI's reasoning processes within a controlled yet engaging setting, pushing the boundaries of AI research while providing participants with a challenging and enjoyable experience.
              </p>
              <h2 className="font30 extraBold">Games Overview</h2>
              <ul className="font13">
                <li><strong>Akinator (Deductive and Multi-hop Reasoning) :</strong> 
                <br />
                Players challenge the AI by having it guess objects based on a series of yes/no questions. The AI demonstrates deductive reasoning by deriving specific conclusions from general premises, while multi-hop reasoning is showcased as it connects sequential information to narrow down the possibilities to the correct answer. This controlled setting evaluates the AI's ability to formulate and refine hypotheses over multiple rounds.</li>
                <li><strong>Taboo (Abductive and Multi-hop Reasoning):</strong>
                <br />
                 The AI utilizes abductive reasoning to generate hypotheses from fragmented clues provided by the player, aiming to guess a secret word without directly mentioning it. The game tests the AI's ability to infer under conditions of uncertainty and ambiguity, employing multi-hop reasoning to piece together information from the player's prompts. This game is a test of the AI's capacity to handle incomplete information and still arrive at the most probable conclusion.</li>
                <li><strong>Bluffing (Inductive and Multi-hop Reasoning):</strong> 
                <br />
                The Bluffing game challenges the AI's inductive reasoning by having it determine the truthfulness of statements made by players based on observed responses. The AI uses multi-hop reasoning to connect these observations and formulate a logical conclusion about the player's honesty. This game assesses the AI's ability to detect deception and its strategic questioning prowess, which are crucial for understanding and responding to human interactions in realistic scenarios.</li>
              </ul>
            </MoreContent>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const MoreContent = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;

  h2 {
    margin-top: 15px;
  }

  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
`;
