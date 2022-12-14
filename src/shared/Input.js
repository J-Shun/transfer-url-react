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

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: transparent;
  border: 2px solid #fff;
  outline: none;
  margin-bottom: ${(props) => props.mb};
  transition: ease-out 0.5s;
  resize: none;

  &:focus {
    border: 2px solid #fcee0a;
  }
`;

export const Label = styled.label`
  width: 100%;
  font-size: 1.5rem;
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

export const Select = styled.select`
  width: ${(props) => props.width || "100%"};
  font-size: 1.25rem;
  padding: 0.5rem 0.75rem;
  color: #fff;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  outline: none;
  transition: 0.5s;
  margin-bottom: ${(props) => props.mb};

  &:focus {
    border-bottom: 2px solid #fcee0a;
  }
`;

export const Option = styled.option`
  background-color: #000;
  color: #fff;
  transition: 0.3;
`;
