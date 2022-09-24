import styled from "styled-components";

export const FormSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;

  .selection {
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
  }

  .direct {
    color: #fff;
    align-self: flex-end;
    text-decoration: underline;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  .align-end {
    align-self: flex-end;
  }

  @media screen and (min-width: 576px) {
    max-width: 400px;
  }
`;

export const Category = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
`;
