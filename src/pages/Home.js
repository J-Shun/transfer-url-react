import { Form } from "../components/styles/Form.styled";
import { SelectButton } from "../components/styles/Button.styled";
import { Title } from "../components/styles/Text.styled";
import { Group } from "../components/styles/Group.styled";
import { Login } from "../components/Login";
import { ForgetPassword } from "../components/ForgetPassword";
import { Register } from "../components/Register";
import { useState } from "react";

export const Home = () => {
  const [category, setCategory] = useState("login");
  const [loginForm, setLoginForm] = useState({
    login: true,
    register: false,
  });

  return (
    <Form>
      <Title>URL Transfer</Title>

      <Group justify="center" mb="2rem">
        <SelectButton
          full={loginForm.login}
          onClick={(e) => {
            e.preventDefault();
            setCategory("login");
            setLoginForm({ login: true, register: false });
          }}
        >
          LOGIN
        </SelectButton>
        <SelectButton
          full={loginForm.register}
          onClick={(e) => {
            e.preventDefault();
            setCategory("register");
            setLoginForm({ login: false, register: true });
          }}
        >
          REGISTER
        </SelectButton>
      </Group>

      {category === "login" ? (
        <Login setCategory={setCategory} setLoginForm={setLoginForm} />
      ) : category === "register" ? (
        <Register />
      ) : (
        <ForgetPassword setLoginForm={setLoginForm} />
      )}
    </Form>
  );
};
