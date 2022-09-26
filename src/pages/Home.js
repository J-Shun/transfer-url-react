import styled from "styled-components";
import { SelectButton } from "../shared/Button";
import { HomeTitle } from "../shared/Text";
import { Group } from "../shared/Group";
import { Login } from "../components/Login";
import { ForgetPassword } from "../components/ForgetPassword";
import { Register } from "../components/Register";
import { useState } from "react";

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 576px) {
    max-width: 576px;
  }
`;

export const Home = () => {
  const [category, setCategory] = useState("login");
  const [loginForm, setLoginForm] = useState({
    login: true,
    register: false,
  });

  return (
    <Form>
      <HomeTitle>URL Transfer</HomeTitle>

      <Group justify="center" mb="2.5rem">
        <SelectButton
          width="45%"
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
          width="45%"
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
        <ForgetPassword setCategory={setCategory} setLoginForm={setLoginForm} />
      )}
    </Form>
  );
};
