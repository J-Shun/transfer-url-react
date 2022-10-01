import { Container } from "../shared/Container";
import { Group, GroupCol } from "../shared/Group";
import { Card } from "../shared/Card";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Input } from "../shared/Input";
import { useState, useContext } from "react";
import { sendData, useFetch } from "../api/api";
import { url, updateFileRoute, checkTokenRoute } from "../api/routes";
import { Model } from "../components/Model";
import { Context } from "../App";
import { isFill } from "../utilities/checkForm";
import { JellyTriangle } from "@uiball/loaders";
import { Navigate } from "react-router-dom";

export const Profile = () => {
  const { modelDispatch } = useContext(Context);
  const [profile, setProfile] = useState({
    name: localStorage.user,
  });

  const { data, isLoading } = useFetch(url + checkTokenRoute);
  if (data.message === "jwt malformed") {
    return <Navigate to="/" />;
  }

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
      localStorage.setItem("user", result.name);
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

  if (isLoading) {
    return (
      <div className="icon-background">
        <JellyTriangle size={60} speed={1.75} color="#fcee0a" />;
      </div>
    );
  } else {
    return (
      <>
        <Container>
          <Card mt="8rem" maxWidth="500px">
            <CardTitle mb="2rem">Profile</CardTitle>
            <GroupCol mb="2rem">
              <CardSubTitle>EMAIL</CardSubTitle>
              <Input value={localStorage.email} disabled></Input>
            </GroupCol>
            <GroupCol mb="2rem">
              <CardSubTitle>NAME</CardSubTitle>
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
  }
};
