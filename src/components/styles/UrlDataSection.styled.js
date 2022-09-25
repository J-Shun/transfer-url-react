import styled from "styled-components";

export const UrlDataSection = styled.div`
  position: relative;
  padding: 1rem 1rem;
  color: #fff;
  /* background-color: #183e40; */
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

  span {
    font-size: 1.25rem;
    background-color: #287bff;
    margin: 0.25rem;
    padding: 0.25rem 0.25rem;

    &:hover {
      background-color: #e23832;
      cursor: pointer;
    }
  }
`;
