import styled from "styled-components";

export const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 576px) {
    max-width: 576px;
  }
`;
