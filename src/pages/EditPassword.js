import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../App";
import { sendData, useFetch } from "../api/api";
import { url, editPasswordRoute, checkTokenRoute } from "../api/routes";
import { Container } from "../shared/Container";
import { Card } from "../shared/Card";
import { Input } from "../shared/Input";
import { SubmitButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { CardTitle } from "../shared/Text";
import { Corner } from "../shared/Corner";
import { Model } from "../components/Model";
import { PageLoading, ApiLoading } from "../components/Loading";
import { isFill, isValidPassword } from "../utilities/checkForm";

export const EditPassword = () => {
  const { modelDispatch, callApi, setCallApi } = useContext(Context);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const { data, isLoading } = useFetch(url + checkTokenRoute);
  if (data.message === "jwt malformed") return <Navigate to="/" />;

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
        message: "invalid password form",
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
    setCallApi(true);
    const result = await sendData("patch", url + editPasswordRoute, password);
    setCallApi(false);

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
        message: "server error",
      });
    }
  };

  if (isLoading) return <PageLoading />;
  return (
    <>
      <Container>
        <Card mt="8rem" maxWidth="500px">
          <Corner />

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

      {callApi && <ApiLoading />}

      <Model />
    </>
  );
};
