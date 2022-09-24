import styled from "styled-components";

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #dae541;
  padding: 1rem 0;
  font-style: italic;
`;

export const Warn = styled.span`
  color: #e23832;
  margin-top: 0.5rem;
  justify-content: ${(props) => props.center && "center"};
`;
