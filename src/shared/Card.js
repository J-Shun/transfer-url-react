import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  max-width: ${(props) => props.maxWidth};
  color: #fff;
  border: 2px solid #fff;
  padding: ${(props) => props.py || "1rem"} ${(props) => props.px || "1rem"};
  transition: ease-in-out 0.3s;
  margin-top: ${(props) => props.mt};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
  z-index: 1;

  &:hover {
    box-shadow: 4px 4px 0px #fff;
  }
`;
