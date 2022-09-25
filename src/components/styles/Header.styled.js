import styled from "styled-components";

export const HeaderSection = styled.header`
  .header-selection {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    font-size: 2rem;
    color: #fcee0a;
    background-color: #000;
    padding: 0 2rem;
  }

  h1 {
    font-style: italic;
    font-size: 2rem;
    cursor: pointer;
  }

  .header-bar {
    cursor: pointer;
  }
`;
