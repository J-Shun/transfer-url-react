import { Container } from "../shared/Container";
import { Group, GroupCol } from "../shared/Group";
import { CgProfile } from "react-icons/cg";
import { Card } from "../shared/Card";
import { CardTitle, CardSubTitle, CardText } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Input } from "../shared/Input";

export const Profile = () => {
  return (
    <>
      <Container style={{ color: "#fff" }}>
        <Card>
          <CardTitle>Profile</CardTitle>
          <CgProfile />
          <GroupCol mb="2rem">
            <CardSubTitle>[EMAIL]</CardSubTitle>
            <CardText>attrasd123456@gmail.com</CardText>
          </GroupCol>
          <GroupCol mb="2rem">
            <CardSubTitle>[NAME]</CardSubTitle>
            <CardText>{localStorage.user}</CardText>
            {/* <Input type="text" /> */}
          </GroupCol>
          <Group justify="center" mb="2rem">
            <SubmitButton>SAVE</SubmitButton>
          </Group>
        </Card>
      </Container>
    </>
  );
};
