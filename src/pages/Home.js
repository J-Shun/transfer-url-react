import { Form } from "../components/styles/Form.styled";
import { SelectButton } from "../components/styles/Button.styled";
import { Title } from "../components/styles/Text.styled";
import { Group } from "../components/styles/Group.styled";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { useState } from "react";

export const Home = () => {
  const [category, setCategory] = useState("login");
  const [loginForm, setLoginForm] = useState(true);

  return (
    <Form>
      <Title>URL Transfer</Title>

      <Group justify="center" mb="2rem">
        <SelectButton
          full={loginForm}
          onClick={(e) => {
            e.preventDefault();
            setCategory("login");
            setLoginForm(true);
          }}
        >
          LOGIN
        </SelectButton>
        <SelectButton
          full={!loginForm}
          onClick={(e) => {
            e.preventDefault();
            setCategory("register");
            setLoginForm(false);
          }}
        >
          REGISTER
        </SelectButton>
      </Group>

      {category === "login" ? <Login /> : <Register />}
    </Form>
  );
};
