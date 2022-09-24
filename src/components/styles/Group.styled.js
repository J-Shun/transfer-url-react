import styled from "styled-components";

export const Group = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: ${(props) => props.center && "center"};
  gap: ${(props) => props.gap};
`;

export const GroupCol = styled(Group)`
  margin-bottom: 1.5rem;
  flex-direction: column;
`;
