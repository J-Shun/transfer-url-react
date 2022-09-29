import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  background-color: #313847;
  border: none;
  border-radius: 2rem;
  padding: ${(props) => props.py || "1.5rem"} ${(props) => props.px || "2rem"};
  transition: ease-in-out 0.3s;
  margin-top: ${(props) => props.mt};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  z-index: 1;

  /* &:hover {
    box-shadow: 4px 4px 0px #fff;
  } */
`;
