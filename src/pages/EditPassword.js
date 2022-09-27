import { Card } from "../shared/Card";
import { Container } from "../shared/Container";
import { Input } from "../shared/Input";
import { SubmitButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { CardTitle } from "../shared/Text";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { url, editPasswordRoute } from "../api/routes";
import { Model } from "../components/Model";
import { ModelContext } from "../App";
import { isFill, isValidPassword } from "../utilities/checkForm";

export const EditPassword = () => {
  const { modelDispatch } = useContext(ModelContext);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const isFormPass = () => {
    if (!isFill(password.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty password",
      });
      return false;
    } else if (!isValidPassword(password.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid password",
      });
      return false;
    } else if (password.password !== password.confirmPassword) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "confirm password incorrect",
      });
      return false;
    }
    return true;
  };

  const submitNewPassword = async () => {
    if (!isFormPass()) return;
    const result = await sendData("patch", url + editPasswordRoute, password);
    if (result.status === "success") {
      modelDispatch({
        type: "show",
        status: "success",
        message: "password reset success",
      });
      setPassword({ password: "", confirmPassword: "" });
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "database no response",
      });
    }
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

      <Model />
    </>
  );
};
