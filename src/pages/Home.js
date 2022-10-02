import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { useFetch } from "../api/api";
import { ForgetPassword } from "../components/ForgetPassword";
import { PageLoading } from "../components/Loading";
import { SelectButton } from "../shared/Button";
import { HomeTitle } from "../shared/Text";
import { Group } from "../shared/Group";
import { url, checkTokenRoute } from "../api/routes";
import styled from "styled-components";

const Form = styled.div`
  position: relative;
  width: 100%;
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

  const { data, isLoading } = useFetch(url + checkTokenRoute);
  if (data.status === "success") {
    return <Navigate to="/user" />;
  }

  if (isLoading) return <PageLoading />;

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
