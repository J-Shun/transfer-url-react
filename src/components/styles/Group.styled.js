import styled from "styled-components";

export const Group = styled.div`
  display: flex;
  justify-content: ${(props) => props.center && "center"};
  gap: ${(props) => props.gap};
  margin-bottom: ${(props) => props.mb};
`;

export const GroupCol = styled(Group)`
  flex-direction: column;
`;
