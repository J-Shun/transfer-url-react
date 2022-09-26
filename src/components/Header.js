import { EditPassword } from "./EditPassword";
import { HeaderSection } from "./styles/Header.styled";
import { Nav } from "./styles/Nav.styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
            <li onClick={toggleNav}>
              <Link className="nav-link">Profile</Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/updatePassword" className="nav-link">
                Edit Password
              </Link>
            </li>
            <li
              className="nav-link"
              onClick={() => {
                toggleNav();
                logout();
              }}
            >
              Logout
            </li>
          </ul>
        </Nav>

        <EditPassword />
      </HeaderSection>
    </>
  );
};
