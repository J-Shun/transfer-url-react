import styled from "styled-components";

export const Group = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  gap: ${(props) => props.gap};
  margin-bottom: ${(props) => props.mb};
`;

export const GroupCol = styled(Group)`
  flex-direction: column;
`;
