import styled from "styled-components";

export const Form = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 576px) {
    max-width: 576px;
  }
`;
