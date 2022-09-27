import { GroupCol } from "../shared/Group";
import { Input } from "../shared/Input";
import { Warn } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Select, Option } from "../shared/Input";
import { useState, useContext } from "react";
import { userResetPassword } from "../api/api";
import { Model } from "./Model";
import { ModelContext } from "../App";
import { isFill, isValidEmail, isValidPassword } from "../utilities/checkForm";

export const ForgetPassword = ({ setCategory, setLoginForm }) => {
  const { modelDispatch } = useContext(ModelContext);
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

  const isFormPass = () => {
    if (!isFill(resetData.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty email",
      });
      return false;
    } else if (!isValidEmail(resetData.email)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid email",
      });
      return false;
    } else if (!isFill(resetData.safetyQuestion)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "question not selected",
      });
      return false;
    } else if (!isFill(resetData.safetyAnswer)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty answer",
      });
      return false;
    } else if (!isFill(resetData.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty password",
      });
      return false;
    } else if (!isValidPassword(resetData.password)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid password",
      });
      return false;
    } else if (resetData.password !== resetData.confirmPassword) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "confirm password incorrect",
      });
      return false;
    }
    return true;
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!isFormPass()) return;

    const result = await userResetPassword(resetData);
    console.log(result);
    if (result.status === "success") {
      setCategory("login");
      modelDispatch({
        type: "show",
        status: "success",
        message: "password reset success",
      });
      setLoginForm({ login: true, register: false });
    } else if (result.message === "無此用戶") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "no this account",
      });
    } else if (result.message === "安全提問錯誤") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "wrong answer",
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

      <Model />
    </>
  );
};
