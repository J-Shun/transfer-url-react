import { GroupCol } from "../shared/Group";
import { Input } from "../shared/Input";
import { Warn, Help } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { useState, useContext } from "react";
import { userLogin } from "../api/api";
import { Model } from "./Model";

import { ModelContext } from "../App";
import { isFill, isValidEmail } from "../utilities/checkForm";

export const Login = ({ setCategory, setLoginForm }) => {
  const { modelDispatch } = useContext(ModelContext);
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
    console.log("break point");

    const result = await userLogin(login);
    console.log(result);
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.name);
      alert("loading page");
    } else if (result.message === "會員不存在") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "account not found",
      });
    } else if (result.message === "密碼錯誤") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "wrong password",
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
      <Model />
    </>
  );
};
