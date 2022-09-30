import { Container } from "../shared/Container";
import { Group, GroupCol } from "../shared/Group";
import { Card } from "../shared/Card";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Input } from "../shared/Input";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { url, updateFileRoute } from "../api/routes";
import { Model } from "../components/Model";
import { Context } from "../App";
import { isFill } from "../utilities/checkForm";

export const Profile = () => {
  const { modelDispatch } = useContext(Context);
  const [profile, setProfile] = useState({
    name: localStorage.user,
  });

  const handleProfile = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const isFormPass = () => {
    if (profile.name === localStorage.user) return;
    if (!isFill(profile.name)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "empty name",
      });
      return;
    }
    return true;
  };

  const submit = async () => {
    if (!isFormPass()) return;
    const result = await sendData("patch", url + updateFileRoute, profile);
    if (result.status === "success") {
      localStorage.setItem("user", result.user.name);
      localStorage.setItem("email", result.user.email);
      modelDispatch({
        type: "show",
        status: "success",
        message: "update profile",
      });
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "database no response",
      });
    }
  };

  return (
    <>
      <Container>
        <Card mt="8rem">
          <CardTitle mb="2rem">Profile</CardTitle>
          <GroupCol mb="2rem">
            <CardSubTitle>[EMAIL]</CardSubTitle>
            <Input value={localStorage.email} disabled></Input>
          </GroupCol>
          <GroupCol mb="2rem">
            <CardSubTitle>[NAME]</CardSubTitle>
            <Input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfile}
            />
          </GroupCol>
          <Group justify="center" mb="2rem">
            <SubmitButton onClick={submit}>SAVE</SubmitButton>
          </Group>
        </Card>
      </Container>

      <Model />
    </>
  );
};
