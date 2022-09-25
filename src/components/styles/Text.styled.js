import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #fcee0a;
  padding: 2rem 0;
  font-style: italic;
`;

export const Warn = styled.span`
  color: #e23832;
  justify-content: ${(props) => props.center && "center"};
  opacity: 0;
  pointer-events: none;
`;

export const Help = styled.span`
  color: #fff;
  font-size: 1.25rem;
  align-self: center;
  text-decoration: underline;
  cursor: pointer;
`;
