import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: 100%;
  padding: 0 15px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 576px) {
    max-width: 540px;
  }

  @media screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
  }
`;
