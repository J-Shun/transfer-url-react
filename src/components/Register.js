import { GroupCol } from "./styles/Group.styled";
import { Input } from "./styles/Input.styled";
import { Warn } from "./styles/Text.styled";
import { SubmitButton } from "./styles/Button.styled";
import { useState } from "react";

export const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      <GroupCol mb="3rem">
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
      <SubmitButton>SUBMIT</SubmitButton>
    </>
  );
};
