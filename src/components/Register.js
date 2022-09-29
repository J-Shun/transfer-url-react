import { GroupCol } from "../shared/Group";
import { Input, Select, Option } from "../shared/Input";
import { Warn } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { url, signUpRoute } from "../api/routes";
import { Model } from "./Model";
import { Context } from "../App";
import { isFill, isValidEmail, isValidPassword } from "../utilities/checkForm";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utilities/saveToken";

export const Register = () => {
  const navigate = useNavigate();
  const { modelDispatch } = useContext(Context);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    safetyQuestion: "",
    safetyAnswer: "",
  });

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const isFormPass = () => {
    if (!isFill(register.name)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty name",
      });
      return false;
    } else if (!isFill(register.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty email",
      });
      return false;
    } else if (!isValidEmail(register.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid email",
      });
      return false;
    } else if (!isFill(register.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty password",
      });
      return false;
    } else if (!isValidPassword(register.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid password",
      });
      return false;
    } else if (register.password !== register.confirmPassword) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "confirm password incorrect",
      });
      return false;
    } else if (!isFill(register.safetyQuestion)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "question not selected",
      });
      return false;
    } else if (!isFill(register.safetyAnswer)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty answer",
      });
      return false;
    }
    return true;
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (!isFormPass()) return;

    const result = await sendData("post", url + signUpRoute, register);
    if (result.token) {
      saveToken(result);
      modelDispatch({
        type: "show",
        status: "success",
        message: "account created",
      });
      navigate("/user");
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "email already registered",
      });
    }
  };

  return (
    <>
      <GroupCol mb="1rem">
        <Input
          type="text"
          placeholder="NAME"
          name="name"
          mb="0.5rem"
          value={register.name}
          onChange={handleRegister}
        />
        <Warn>Please enter your name </Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Input
          type="text"
          placeholder="EMAIL"
          name="email"
          mb="0.5rem"
          value={register.email}
          onChange={handleRegister}
        />
        <Warn>Need lowercase, uppercase, special character</Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Input
          type="password"
          placeholder="PASSWORD"
          name="password"
          mb="0.5rem"
          value={register.password}
          onChange={handleRegister}
        />
        <Warn>Please enter password </Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Input
          type="password"
          placeholder="PASSWORD"
          name="confirmPassword"
          mb="0.5rem"
          value={register.confirmPassword}
          onChange={handleRegister}
        />
        <Warn>Confirm password incorrect</Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Select name="safetyQuestion" mb="1rem" onChange={handleRegister}>
          <Option value="">Select Safety Question</Option>
          <Option value="Q1_FIRST_PET_NAME">Q : Name of First Pet ?</Option>
          <Option value="Q2_PARENTS_CITY">Q : Parents' Living City ?</Option>
        </Select>
      </GroupCol>
      <GroupCol mb="3rem">
        <Input
          type="text"
          placeholder="Safety Answer"
          name="safetyAnswer"
          mb="0.5rem"
          value={register.safetyAnswer}
          onChange={handleRegister}
        />
        <Warn>Please Answer Safety Question</Warn>
      </GroupCol>
      <SubmitButton mb="5rem" onClick={submitRegister}>
        SUBMIT
      </SubmitButton>

      <Model />
    </>
  );
};
