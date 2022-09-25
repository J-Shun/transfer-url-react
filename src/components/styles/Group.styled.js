import styled from "styled-components";

export const Group = styled.div`
  display: flex;
  position: relative;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  flex-wrap: wrap;
  gap: ${(props) => props.gap};
  margin-bottom: ${(props) => props.mb};
`;

export const GroupCol = styled(Group)`
  flex-direction: column;
`;
