import { Card } from "../shared/Card";
import { Container } from "../shared/Container";
import { Input } from "../shared/Input";
import { SubmitButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { CardTitle } from "../shared/Text";
import { useState } from "react";
import { userEditPassword } from "../api/api";

export const EditPassword = () => {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const submitNewPassword = async () => {
    console.log(password);
    const result = await userEditPassword(password);
    console.log(result);
  };

  return (
    <>
      <Container style={{ color: "#fff" }}>
        <Card>
          <CardTitle mb="2rem">Edit Password</CardTitle>
          <Input
            mb="1.5rem"
            type="password"
            name="password"
            value={password.password}
            placeholder="Enter New Password"
            onChange={handlePassword}
          />
          <Input
            mb="2rem"
            type="password"
            name="confirmPassword"
            value={password.confirmPassword}
            placeholder="Confirm New Password"
            onChange={handlePassword}
          />
          <Group justify="center">
            <SubmitButton mb="2rem" onClick={submitNewPassword}>
              Save
            </SubmitButton>
          </Group>
        </Card>
      </Container>
    </>
  );
};
