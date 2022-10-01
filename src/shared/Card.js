import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  background-color: #333;
  border-radius: 2rem;
  /* border: 2px solid #3afbd0; */
  padding: ${(props) => props.py || "1.5rem"} ${(props) => props.px || "2rem"};
  transition: ease-in-out 0.3s;
  margin-top: ${(props) => props.mt};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  z-index: 1;

  /* box-shadow: 4px 4px 2px #b143d6; */
`;
