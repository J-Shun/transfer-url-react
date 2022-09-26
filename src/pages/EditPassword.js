import { Card } from "../shared/Card";
import { Container } from "../shared/Container";
import { Input } from "../shared/Input";
import { SubmitButton } from "../shared/Button";

export const EditPassword = () => {
  return (
    <>
      <h2>Edit Password</h2>
      <Container style={{ color: "#fff" }}>
        <Card>
          <Input mb="1.5rem" type="text" />
          <Input mb="1.5rem" type="text" />
          <Input mb="2rem" type="text" />
          <SubmitButton mb="2rem">Save</SubmitButton>
        </Card>
      </Container>
    </>
  );
};
