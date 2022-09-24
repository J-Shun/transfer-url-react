import { FormSection, Category } from "./styles/Form.styled";
import { SubmitButton, SelectButton } from "./styles/Button.styled";
import { Input } from "./styles/Input.styled";
import { Title, Warn } from "./styles/Text.styled";
import { Group, GroupCol } from "./styles/Group.styled";
import { userLogin, userRegister } from "../api/api";
import { useState } from "react";

export const Form = () => {
  const [category, setCategory] = useState("login");
  const [show, setShow] = useState(true);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const handleRegister = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setRegister({ ...register, [name]: value });
        break;
      case "email":
        setRegister({ ...register, [name]: value });
        break;
      case "password":
        setRegister({ ...register, [name]: value });
        break;
      case "confirmPassword":
        setRegister({ ...register, [name]: value });
        break;
      default:
        return;
    }
  };
  const submit = async () => {
    if (category === "login") {
      const result = await userLogin(login);
      if (!result.name) return alert("Wrong!!!");
      localStorage.setItem("token", `Bearer ${result.token}`);
    } else if (category === "register") {
      const result = await userRegister(register);
      if (!result.name) return alert("Wrong!!!");
      localStorage.setItem("token", `Bearer ${result.token}`);
    }
  };

  const toggleShow = (e) => {
    const { name } = e.target;
    if (name === "login") setShow(true);
    else setShow(false);
  };

  const checkStatus = () => {
    console.log("checkStatus");
  };

  return (
    <FormSection>
      <Title>URL Transfer</Title>
      <Group center>
        <SelectButton
          name="login"
          onClick={(e) => {
            setCategory("login");
            toggleShow(e);
          }}
          show={show}
        >
          LOGIN
        </SelectButton>
        <SelectButton
          name="register"
          onClick={(e) => {
            setCategory("register");
            toggleShow(e);
          }}
          show={!show}
        >
          REGISTER
        </SelectButton>
      </Group>

      <Category show={show}>
        <GroupCol>
          <Input
            type="text"
            placeholder="EMAIL"
            name="email"
            value={login.email}
            onChange={handleLogin}
            onBlur={checkStatus}
          />
          <Warn email={login.email}>Please enter a valid email </Warn>
        </GroupCol>
        <GroupCol>
          <Input
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={login.password}
            onChange={handleLogin}
            onBlur={checkStatus}
          />
          <Warn password={login.password}>Please enter password </Warn>
        </GroupCol>
        <span className="align-end">FORGET PASSWORD</span>
      </Category>

      <Category show={!show}>
        <GroupCol>
          <Input
            type="text"
            placeholder="NAME"
            name="name"
            value={register.name}
            onChange={handleRegister}
          />
          <Warn>Please enter your name </Warn>
        </GroupCol>
        <GroupCol>
          <Input
            type="text"
            placeholder="EMAIL"
            name="email"
            value={register.email}
            onChange={handleRegister}
          />
          <Warn>Please enter a valid email </Warn>
        </GroupCol>
        <GroupCol>
          <Input
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={register.password}
            onChange={handleRegister}
          />
          <Warn>Please enter password </Warn>
        </GroupCol>
        <GroupCol>
          <Input
            type="password"
            placeholder="PASSWORD"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleRegister}
          />
          <Warn>Password incorrect</Warn>
        </GroupCol>
      </Category>

      <SubmitButton onClick={submit}>SUBMIT</SubmitButton>
    </FormSection>
  );
};
