import { HeaderSection } from "./styles/Header.styled";
import { Nav } from "./styles/Nav.styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <HeaderSection>
        <div className="header-selection">
          <h1>Transfer URL</h1>
          <GiHamburgerMenu className="header-bar" onClick={toggleNav} />
        </div>
        <Nav showNav={showNav}>
          <ul>
            <li>Profile</li>
            <li>Edit Password</li>
            <li>Logout</li>
          </ul>
        </Nav>
      </HeaderSection>
    </>
  );
};
