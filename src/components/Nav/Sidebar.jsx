import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link} from "react-router-dom";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";
import Logo from "../../assets/svg/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <Logo darkMode={true}/>
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            Lmgame Bench
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer ">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <StyledLi className="whiteColor" onClick={() => navigate("/")}>
            Home
        </StyledLi>
        <StyledLi className="semiBold font16 pointer whiteColor" onClick={toggleDropdown} style={{ position: "relative" }}>
          <span style={{ padding: "10px 16px", cursor: "pointer" }}>
            Leaderboards
          </span>
          {isDropdownOpen && (
            <DropdownMenu>
              <a
                  href="https://huggingface.co/spaces/lmgame/game_arena_bench"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <DropdownItem onClick={closeDropdown}>
                    Lmgame Bench
                  </DropdownItem>
              </a>
              {/*
              <DropdownItem onClick={() => { navigate("/ai_escape"); closeDropdown(); }}>
                Space Escape
              </DropdownItem>
              */}
            </DropdownMenu>
          )}
        </StyledLi>
        <StyledLi className="whiteColor" onClick={() => navigate("/blog")}>
            Blog
        </StyledLi>
        <StyledLi className="whiteColor" onClick={() => navigate("/aboutus")}>
          About Us
        </StyledLi>
        {/* <li className="semiBold font15 pointer flexCenter">
          <a href="https://www.roblox.com/share?code=7d09ddeb74a9034dbec6aa27bb0572a9&type=ExperienceDetails&stamp=1737092101410" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
            Play Now
          </a>
        </li> */}
        <SocialIcons>
          <a href="https://github.com/lmgame-org/GamingAgent" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="3x" />
          </a>
        </SocialIcons>

      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  list-style: none;
  padding-left: 0;
  li {
    margin: 20px 0;
  }
`;

const StyledLi = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  list-style: none;

  &:hover {
    border-bottom: 2px solid #7620FF;
    color: #7620FF;
  }
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1000;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 40px;

  a {
    color: #fff; /* White icons */
    transition: color 0.3s;
    
    &:hover {
      color: #7620ff; /* Purple hover effect */
    }
  }
`;