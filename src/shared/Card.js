import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  padding: 1rem 1rem;
  color: #fff;
  transition: ease-in-out 0.3s;
  border: 1px solid #fff;
  margin-bottom: 1.5rem;

  &:hover {
    box-shadow: 4px 4px 0px #fff;
  }

  h4 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: #fcee0a;
  }
`;
