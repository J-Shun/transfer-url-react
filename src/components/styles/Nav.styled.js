import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  top: 4rem;
  right: 0;
  left: 0;
  z-index: 1;
  background-color: #000;
  height: 100vh;
  transition: ease-out 0.3s;
  transform: ${(props) =>
    props.showNav ? "translateX(0)" : "translateX(100%)"};
  opacity: 0.9;

  ul {
    padding-top: 3rem;
  }

  .nav-link {
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
