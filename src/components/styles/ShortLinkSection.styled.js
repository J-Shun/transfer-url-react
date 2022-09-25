import styled from "styled-components";

export const ShortLinkSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  background-color: #000;
  opacity: 0.9;
  transition: 0.5s;
  transform: ${(props) =>
    props.shortLink ? "translateX(0)" : "translateX(-100%)"};

  .shortLink-card {
    border: 2px solid #fff;
    padding: 0 1rem;
    margin-top: 3rem;
    color: #fff;
  }

  .shortLink-title {
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    color: #fcee0a;
    background-color: #000;
    padding: 0.25rem;
    transform: translateY(-50%);
  }

  .shortLink-subtitle {
    color: #fcee0a;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;
