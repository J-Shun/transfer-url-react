import { Label, Input, Select, Option } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { useState, useContext } from "react";
import { sendData, uploadImage } from "../api/api";
import { url, shortLinkRoute, uploadImageRoute } from "../api/routes";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";
import { Context } from "../App";
import { isFill } from "../utilities/checkForm";
import validator from "validator";
import "../assets/icon.css";

const OgSection = styled.div`
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  background-color: #000;
  transition: transform 0.5s;
  transform: ${(props) =>
    props.showForm ? "translateX(0)" : "translateX(-100%)"};
`;

export const Og = ({ showOgForm, setShowOgForm, og, id }) => {
  const { modelDispatch, renderTrigger, setRenderTrigger, setDataListUrl } =
    useContext(Context);
  const ogPrototype = {
    type: "",
    title: "",
    description: "",
    url: "",
  };
  if (og?.type) ogPrototype.type = og.type;
  if (og?.title) ogPrototype.title = og.title;
  if (og?.description) ogPrototype.description = og.description;
  if (og?.url) ogPrototype.url = og.url;

  let imagePrototype = "";
  if (og?.image) imagePrototype = og.image;
  const [image, setImage] = useState(imagePrototype);
  const [imageName, setImageName] = useState(imagePrototype);

  const [formData, setFormData] = useState(ogPrototype);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validImage = (file) => {
    if (!file.type.startsWith("image")) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "not image file",
      });
      return false;
    } else if (file.size > 2 * 1024 * 1024) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "size limit: 2MB",
      });
      return false;
    } else if (
      !file.type.endsWith("png") &&
      !file.type.endsWith("jpg") &&
      !file.type.endsWith("jpeg")
    ) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "<png> <jpg> <jpeg> only",
      });
      return false;
    }
    return true;
  };

  const submitUpload = async (e) => {
    if (e.target.files[0] === undefined) {
      return;
    }
    const file = e.target.files[0];
    if (!validImage(file)) return;
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage("post", url + uploadImageRoute, formData);
    setImage(result.imgUrl);
    setImageName(file.name);
  };

  const cancelImage = () => {
    setImageName("");
    setImage("");
  };

  const isForm = () => {
    if (!isFill(formData.title)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "og require title",
      });
      return false;
    } else if (!isFill(formData.description)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "og require description",
      });
      return false;
    } else if (isFill(formData.url) && !validator.isURL(formData.url)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "og invalid url",
      });
      return false;
    }
    return true;
  };

  const rebuildForm = (data) => {
    const cleanData = {};
    cleanData.title = data.title.trim();
    cleanData.description = data.description.trim();
    if (isFill(formData.type)) cleanData.type = data.type;
    if (isFill(formData.url)) cleanData.url = data.url;
    if (isFill(image)) cleanData.image = image;
    return cleanData;
  };

  const editOg = async () => {
    if (!isForm()) return;
    const cleanData = rebuildForm(formData);
    const result = await sendData(
      "post",
      `${url + shortLinkRoute}/${id}/og`,
      cleanData
    );
    if (result.status === "success") {
      setRenderTrigger(!renderTrigger);
      setDataListUrl(`${url + shortLinkRoute}?page=1`);
      setShowOgForm(false);
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "system error",
      });
      return false;
    }
  };

  return (
    <>
      <OgSection showForm={showOgForm}>
        <Container>
          <Card maxWidth="500px" mt="4rem" py="2rem">
            <CardTitle mb="2rem">Og Edit</CardTitle>

            <GroupCol mb="2rem">
              <GroupCol className="customize-section">
                <GroupCol mb="1rem">
                  <Select
                    name="type"
                    onChange={handleForm}
                    value={formData.type}
                  >
                    <Option value="">Website (default)</Option>
                    <Option value="article">Article</Option>
                    <Option value="book">Book</Option>
                    <Option value="profile">Profile</Option>
                    <Option value="music">Music</Option>
                    <Option value="video">Video</Option>
                  </Select>
                </GroupCol>
                <Input
                  type="text"
                  placeholder="Title (REQUIRE)"
                  mb="1rem"
                  name="title"
                  value={formData.title}
                  onChange={handleForm}
                />
                <Input
                  type="text"
                  placeholder="Description (REQUIRE)"
                  mb="1rem"
                  name="description"
                  value={formData.description}
                  onChange={handleForm}
                />
                <Input
                  type="text"
                  placeholder="Main URL"
                  mb="1rem"
                  name="url"
                  value={formData.url}
                  onChange={handleForm}
                />
                <Group items="center">
                  <Label>
                    {imageName === "" ? "Upload Image" : imageName}
                    <input
                      type="file"
                      placeholder="Image"
                      style={{ visibility: "hidden", width: "0" }}
                      onChange={submitUpload}
                    />
                  </Label>
                  <TiDeleteOutline
                    className="cancel-image-icon"
                    onClick={cancelImage}
                  />
                </Group>
              </GroupCol>
            </GroupCol>

            <Group justify="center" gap="1.75rem">
              <SubmitButton onClick={editOg}>CREATE</SubmitButton>
              <CancelButton
                onClick={() => {
                  setShowOgForm(false);
                }}
              >
                CANCEL
              </CancelButton>
            </Group>
          </Card>
        </Container>
      </OgSection>
    </>
  );
};
