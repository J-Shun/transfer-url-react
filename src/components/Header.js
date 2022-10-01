import styled from "styled-components";
import { HeaderTitle } from "../shared/Text";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { clearToken } from "../utilities/clearToken";
import { url, shortLinkRoute } from "../api/routes";
import { Context } from "../App";
import { useContext } from "react";

const HeaderSection = styled.div`
  .header-bar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    font-size: 2rem;
    color: #fcee0a;
    background-color: #000;
    padding: 0 2rem;
  }

  .header-icon {
    cursor: pointer;
  }

  .header-nav {
    position: fixed;
    top: 4rem;
    right: 0;
    left: 0;
    z-index: 5;
    background-color: #000;
    height: 100vh;
    transition: ease-out 0.3s;
    transform: ${(props) =>
      props.showNav ? "translateX(0)" : "translateX(100%)"};
    opacity: 0.9;
  }

  ul {
    padding-top: 3rem;
  }

  .header-nav-link {
    display: block;
    font-size: 1.75rem;
    color: #fff;
    text-align: center;
    text-decoration: none;
    padding: 2rem 0;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      color: #fcee0a;
    }
  }
`;

export const Header = () => {
  const { setDataListUrl } = useContext(Context);
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <HeaderSection showNav={showNav}>
        <div className="header-bar">
          <Link to="/user">
            <HeaderTitle
              onClick={() => {
                setShowNav(false);
                setDataListUrl(`${url + shortLinkRoute}?page=1`);
              }}
            >
              URL Transfer
            </HeaderTitle>
          </Link>
          <GiHamburgerMenu className="header-icon" onClick={toggleNav} />
        </div>

        <nav className="header-nav">
          <ul>
            <li
              onClick={() => {
                toggleNav();
                setDataListUrl(`${url + shortLinkRoute}?page=1`);
              }}
            >
              <Link to="/user" className="header-nav-link">
                Data Management
              </Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/user/profile" className="header-nav-link">
                Profile
              </Link>
            </li>
            <li onClick={toggleNav}>
              <Link to="/user/editPassword" className="header-nav-link">
                Edit Password
              </Link>
            </li>
            <li
              onClick={() => {
                toggleNav();
                clearToken();
              }}
            >
              <Link to="/" className="header-nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </HeaderSection>

      <Outlet />
    </>
  );
};
