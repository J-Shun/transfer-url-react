import { JellyTriangle, RaceBy } from "@uiball/loaders";
import styled from "styled-components";

const FullBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 10;
`;

const HalfBackground = styled(FullBackground)`
  background: #000000aa;
`;

export const PageLoading = () => {
  return (
    <FullBackground>
      <JellyTriangle size={60} speed={1.75} color="#fcee0a" />
    </FullBackground>
  );
};

export const ApiLoading = () => {
  return (
    <HalfBackground>
      <RaceBy size={200} lineWeight={5} speed={1.5} color="#3afbd0" />
    </HalfBackground>
  );
};
