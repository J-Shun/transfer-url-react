import { Container } from "../shared/Container";
import { GroupCol } from "../shared/Group";
import { CgProfile } from "react-icons/cg";
import { Card } from "../shared/Card";
import { SubmitButton } from "../shared/Button";
import { Input } from "../shared/Input";

export const Profile = () => {
  return (
    <>
      <h2>Profile</h2>
      <Container style={{ color: "#fff" }}>
        <Card>
          <CgProfile />
          <h3>[EMAIL]</h3>
          <GroupCol mb="2rem">
            <h3>[NAME]</h3>
            <Input type="text" />
          </GroupCol>
          <SubmitButton>SAVE</SubmitButton>
        </Card>
      </Container>
    </>
  );
};
