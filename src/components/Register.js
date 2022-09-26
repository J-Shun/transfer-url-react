import { GroupCol } from "../shared/Group";
import { Input, Select, Option } from "../shared/Input";
import { Warn } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { useState } from "react";
import { userRegister } from "../api/api";

import { Model } from "./Model";

export const Register = () => {
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

  const submitRegister = async (e) => {
    e.preventDefault();
    console.log(register);
    const result = await userRegister(register);
    if (result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", result.name);
    } else {
      console.log(result);
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
        <Warn>Please enter a valid email </Warn>
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
