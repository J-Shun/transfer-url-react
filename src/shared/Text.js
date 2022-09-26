import styled from "styled-components";

export const HomeTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #fcee0a;
  padding: 3rem 0;
  font-style: italic;
`;

export const HeaderTitle = styled.h1`
  color: #fcee0a;
  font-style: italic;
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
  color: #fcee0a;
  font-size: 2.5rem;
  font-style: italic;
  text-align: center;
  background-color: ${(props) => props.bgColor};
  padding: 0.25rem;
  margin-bottom: ${(props) => props.mb};
  transform: ${(props) => props.translateY};
`;

export const CardSubTitle = styled.h3`
  color: #fcee0a;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const CardText = styled.p`
  color: #fff;
  font-size: 1.5rem;
`;

export const Warn = styled.span`
  color: #e23832;
`;

export const Help = styled.span`
  color: #fff;
  font-size: 1.25rem;
  align-self: center;
  text-decoration: underline;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #fcee0a;
  }
`;

export const Tag = styled.span`
  font-size: 1.25rem;
  background-color: #287bff;
  margin: 0.25rem;
  padding: 0.25rem 0.25rem;

  &:hover {
    background-color: #e23832;
    cursor: pointer;
  }
`;
