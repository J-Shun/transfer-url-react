import { GroupCol } from "../shared/Group";
import { Input } from "../shared/Input";
import { Warn, Help } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { useState } from "react";

export const Login = ({ setCategory, setLoginForm }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setLogin({ ...login, [name]: value });
        break;
      case "password":
        setLogin({ ...login, [name]: value });
        break;
      default:
        return;
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(login);
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
    </>
  );
};
