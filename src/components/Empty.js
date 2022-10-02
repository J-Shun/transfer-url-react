import styled from "styled-components";
const EmptySection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #ffffff55;
  text-align: center;
  font-size: 2rem;
  transform: translate(-50%, -50%);
  pointer-events: none;

  .empty {
    margin-bottom: 1.5rem;
  }
`;

export const Empty = () => {
  return (
    <EmptySection>
      <p className="empty">Empty Data</p>
      <p>Click + to start</p>
    </EmptySection>
  );
};
