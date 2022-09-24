import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  padding: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;
`;

export const SubmitButton = styled(Button)`
  color: #fff;
  background-color: transparent;

  /* border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-left: none;
  border-right: none; */

  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-top: none;
  border-bottom: none;

  z-index: 1;
  margin-bottom: ${(props) => props.mb};

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: 0.5s;
    z-index: -1;
  }

  &:hover::before {
    background-color: #287bff;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const CancelButton = styled(SubmitButton)`
  &:hover::before {
    background-color: #e23832;
  }
`;

export const SelectButton = styled(Button)`
  width: 40%;
  color: #fff;
  background-color: transparent;
  border: none;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border: 1px solid #1b456a;
    transform: scale(-1, 1) skew(22deg);
    background-color: ${(props) => (props.full ? "#1B456A" : "transparent")};
    transition: 0.3s;
  }

  &:hover::before {
    background-color: #1b456a;
  }
`;
