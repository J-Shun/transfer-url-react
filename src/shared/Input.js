import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  margin-bottom: ${(props) => props.mb};
  transition: ease-out 0.5s;

  &:focus {
    border-bottom: 2px solid #fcee0a;
  }
`;
