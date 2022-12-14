import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  background-image: linear-gradient(#111111, #1a1a1a);
  padding-left: ${(props) => props.py || "2.25rem"};
  padding-right: ${(props) => props.py || "2.25rem"};
  padding-top: ${(props) => props.px || "2.25rem"};
  padding-bottom: ${(props) => props.px || "2.25rem"};
  transition: ease-in-out 0.3s;
  margin-top: ${(props) => props.mt};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6.5rem;
  z-index: 1;
  animation-name: upToShow;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  @keyframes upToShow {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
