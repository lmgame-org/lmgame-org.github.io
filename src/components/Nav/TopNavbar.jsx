import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import Logo from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import { useNavigate } from "react-router-dom";


export default function TopNavbar() {
  const navigate = useNavigate();
  const [y, setY] = useState(window.scrollY);
  
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);


  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <Logo darkMode={false}/>
            <h1 style={{ marginLeft: "16px" }} className="font20 extraBold">
              Game Arena
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <StyledLi className="semiBold font16 pointer" onClick={() => navigate("/")}>
              Home
            </StyledLi>

            <StyledLi className="semiBold font16 pointer" onClick={toggleDropdown} style={{ position: "relative" }}>
              <span style={{ padding: "10px 16px", cursor: "pointer" }}>
                Game Leaderboards
              </span>
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => { navigate("/akinator"); closeDropdown(); }}>
                    Akinator
                  </DropdownItem>
                  <DropdownItem onClick={() => { navigate("/taboo"); closeDropdown(); }}>
                    Taboo
                  </DropdownItem>
                  <DropdownItem onClick={() => { navigate("/bluffing"); closeDropdown(); }}>
                    Bluffing
                  </DropdownItem>
                </DropdownMenu>
              )}
            </StyledLi>
            <StyledLi className="semiBold font16 pointer" onClick={() => navigate("/blog")}>
                Blog
            </StyledLi>
            <StyledLi className="semiBold font16 pointer" onClick={() => navigate("/aboutus")}>
              About Us
            </StyledLi>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <StyledLi className="semiBold font16 pointer flexCenter">
              <a
                href="https://www.roblox.com/share?code=7d09ddeb74a9034dbec6aa27bb0572a9&type=ExperienceDetails&stamp=1737092101410"
                className="radius8 lightBg"
                style={{ padding: "10px 16px" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Now
              </a>
            </StyledLi>

          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 16px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
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

const StyledLi = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    border-bottom: 2px solid #7620FF;
    color: #7620FF;
  }
`;