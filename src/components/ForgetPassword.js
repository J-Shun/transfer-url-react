import { GroupCol } from "../shared/Group";
import { Input } from "../shared/Input";
import { Warn } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Select, Option } from "../shared/Input";
import { useState } from "react";
import { userResetPassword } from "../api/api";

export const ForgetPassword = ({ setCategory, setLoginForm }) => {
  const [resetData, setResetData] = useState({
    email: "",
    safetyQuestion: "",
    safetyAnswer: "",
    password: "",
    confirmPassword: "",
  });

  const handleResetData = (e) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    console.log(resetData);
    const result = await userResetPassword(resetData);
    console.log(result);
    if (result.status === "success") {
      setCategory("login");
      setLoginForm({ login: true, register: false });
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
          value={resetData.email}
          onChange={handleResetData}
        />
        <Warn>Please enter a valid email </Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Select name="safetyQuestion" mb="1rem" onChange={handleResetData}>
          <Option value="">Select Safety Question</Option>
          <Option value="Q1_FIRST_PET_NAME">Q : Name of First Pet ?</Option>
          <Option value="Q2_PARENTS_CITY">Q : Parents' Living City ?</Option>
        </Select>
      </GroupCol>
      <GroupCol mb="1rem">
        <Input
          type="text"
          placeholder="Safety Answer"
          name="safetyAnswer"
          mb="0.5rem"
          value={resetData.safetyAnswer}
          onChange={handleResetData}
        />
        <Warn>Please Answer Safety Question</Warn>
      </GroupCol>
      <GroupCol mb="1rem">
        <Input
          type="password"
          placeholder="PASSWORD"
          name="password"
          mb="0.5rem"
          value={resetData.password}
          onChange={handleResetData}
        />
        <Warn>Please enter password </Warn>
      </GroupCol>
      <GroupCol mb="3rem">
        <Input
          type="password"
          placeholder="PASSWORD"
          name="confirmPassword"
          mb="0.5rem"
          value={resetData.confirmPassword}
          onChange={handleResetData}
        />
        <Warn>Confirm password incorrect</Warn>
      </GroupCol>
      <SubmitButton mb="5rem" onClick={resetPassword}>
        SUBMIT
      </SubmitButton>
    </>
  );
};
