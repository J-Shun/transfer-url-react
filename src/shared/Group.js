import styled from "styled-components";

export const Group = styled.div`
  position: relative;
  display: flex;
  flex-wrap: ${(props) => (props.wrap === "nowrap" ? props.wrap : "wrap")};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  gap: ${(props) => props.gap};
  margin-bottom: ${(props) => props.mb};
  overflow: hidden;
`;

export const GroupCol = styled(Group)`
  flex-direction: column;
`;
