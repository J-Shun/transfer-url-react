import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  /* border: 2px solid #fff; */
  background-color: #333;
  padding: ${(props) => props.py || "1.5rem"} ${(props) => props.px || "2rem"};
  transition: ease-in-out 0.3s;
  margin-top: ${(props) => props.mt};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6.5rem;
  z-index: 1;
`;
