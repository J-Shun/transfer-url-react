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
import { Navigate } from "react-router-dom";
import { PageLoading, ApiLoading } from "../components/Loading";

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

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <>
        <Container>
          <Card mt="8rem" maxWidth="500px">
            <div className="card-corner card-left-top"></div>
            <div className="card-corner card-right-top"></div>
            <div className="card-corner card-left-bottom"></div>
            <div className="card-corner card-right-bottom"></div>

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

        {callApi && <ApiLoading />}

        <Model />
      </>
    );
  }
};
