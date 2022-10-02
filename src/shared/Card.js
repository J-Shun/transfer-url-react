import styled from "styled-components";
import grid from "../grid.png";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  /* background-color: #111; */
  background-image: linear-gradient(#111111, #1a1a1a);
  /* background-image: url(${grid}); */
  padding: ${(props) => props.py || "1.5rem"} ${(props) => props.px || "2rem"};
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

  .card-corner {
    position: absolute;
    width: 30px;
    height: 30px;
  }

  .card-left-top {
    top: -5px;
    left: -5px;
    border-top: 5px solid #fcee0a;
    border-left: 5px solid #fcee0a;
  }

  .card-right-top {
    top: -5px;
    right: -5px;
    border-top: 5px solid #fcee0a;
    border-right: 5px solid #fcee0a;
  }

  .card-left-bottom {
    bottom: -5px;
    left: -5px;
    border-bottom: 5px solid #fcee0a;
    border-left: 5px solid #fcee0a;
  }

  .card-right-bottom {
    bottom: -5px;
    right: -5px;
    border-bottom: 5px solid #fcee0a;
    border-right: 5px solid #fcee0a;
  }
`;
