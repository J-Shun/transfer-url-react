import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../App";
import { sendData, useFetch } from "../api/api";
import { url, updateFileRoute, checkTokenRoute } from "../api/routes";
import { Container } from "../shared/Container";
import { Group, GroupCol } from "../shared/Group";
import { Card } from "../shared/Card";
import { CardTitle } from "../shared/Text";
import { SubmitButton } from "../shared/Button";
import { Input } from "../shared/Input";
import { Corner } from "../shared/Corner";
import { Model } from "../components/Model";
import { PageLoading, ApiLoading } from "../components/Loading";
import { isFill } from "../utilities/checkForm";
import styled from "styled-components";

const ProfileSection = styled.div`
  .subtitle {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const Profile = () => {
  const { modelDispatch, callApi, setCallApi } = useContext(Context);
  const [profile, setProfile] = useState({ name: localStorage.user });

  const { data, isLoading } = useFetch(url + checkTokenRoute);
  if (data.message === "jwt malformed") return <Navigate to="/" />;

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
    setCallApi(true);
    const result = await sendData("patch", url + updateFileRoute, profile);
    setCallApi(false);
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

  if (isLoading) <PageLoading />;
  return (
    <ProfileSection>
      <Container>
        <Card mt="8rem" maxWidth="500px">
          <Corner />

          <CardTitle mb="2.5rem">Profile</CardTitle>
          <GroupCol mb="2rem">
            <h3 className="subtitle">EMAIL</h3>
            <Input value={localStorage.email} disabled></Input>
          </GroupCol>
          <GroupCol mb="4rem">
            <h3 className="subtitle">NAME</h3>
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

      {callApi && <ApiLoading />}

      <Model />
    </ProfileSection>
  );
};
