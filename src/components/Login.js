import { GroupCol } from "../shared/Group";
import { Input } from "../shared/Input";
import { Warn, Help } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { Model } from "./Model";
import { Context } from "../App";
import { url, loginRoute } from "../api/routes";
import { isFill, isValidEmail } from "../utilities/checkForm";
import { useNavigate } from "react-router-dom";
import { ApiLoading } from "../components/Loading";
import { saveToken } from "../utilities/saveToken";

export const Login = ({ setCategory, setLoginForm }) => {
  const navigate = useNavigate();
  const { modelDispatch, callApi, setCallApi } = useContext(Context);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const isFormPass = () => {
    if (!isFill(login.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty email",
      });
      return false;
    } else if (!isValidEmail(login.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid email",
      });
      return false;
    } else if (!isFill(login.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty password",
      });
      return false;
    }
    return true;
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    if (!isFormPass()) return;

    setCallApi(true);
    const result = await sendData("post", url + loginRoute, login);
    setCallApi(false);

    if (result.token) {
      saveToken(result);
      navigate("/user");
    } else if (result.message === "Incorrect email or password") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "account or password fail",
      });
    }
  };

  return (
    <>
      <GroupCol mb="1rem">
        <Input
          type="text"
          placeholder="EMAIL"
          name="email"
          mb="0.5rem"
          value={login.email}
          onChange={handleLogin}
        />
        <Warn email={login.email}>Please enter a valid email </Warn>
      </GroupCol>
      <GroupCol mb="3rem">
        <Input
          type="password"
          placeholder="PASSWORD"
          name="password"
          mb="0.5rem"
          value={login.password}
          onChange={handleLogin}
        />
        <Warn password={login.password}>Please enter password </Warn>
      </GroupCol>
      <SubmitButton mb="2.5rem" onClick={submitLogin}>
        SUBMIT
      </SubmitButton>
      <Help
        onClick={() => {
          setCategory("forgetPassword");
          setLoginForm({
            login: false,
            register: false,
          });
        }}
      >
        FORGET PASSWORD
      </Help>

      {callApi && <ApiLoading />}

      <Model />
    </>
  );
};
