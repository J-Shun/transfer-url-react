import { GroupCol } from "./styles/Group.styled";
import { Input } from "./styles/Input.styled";
import { Warn } from "./styles/Text.styled";
import { SubmitButton } from "./styles/Button.styled";
import { useState } from "react";

export const ForgetPassword = () => {
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleNewPassword = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "newPassword":
        setNewPassword({ ...newPassword, [name]: value });
        break;
      case "confirmNewPassword":
        setNewPassword({ ...newPassword, [name]: value });
        break;
      default:
        return;
    }
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    console.log(newPassword);
  };

  return (
    <>
      <GroupCol mb="1rem">
        <Input
          type="password"
          placeholder="NEW PASSWORD"
          name="newPassword"
          mb="0.5rem"
          onChange={handleNewPassword}
        />
        <Warn>Please enter new password </Warn>
      </GroupCol>
      <GroupCol mb="3rem">
        <Input
          type="password"
          placeholder="CONFIRM PASSWORD"
          name="confirmNewPassword"
          mb="0.5rem"
          onChange={handleNewPassword}
        />
        <Warn>Confirm password incorrect</Warn>
      </GroupCol>
      <SubmitButton onClick={submitNewPassword}>SUBMIT</SubmitButton>
    </>
  );
};
