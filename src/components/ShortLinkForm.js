import { useRef } from "react";
import { Input } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { MdContentPaste } from "react-icons/md";
import { useState, useContext } from "react";
import { sendData, uploadImage } from "../api/api";
import { url, shortLinkRoute, uploadImageRoute } from "../api/routes";
import styled from "styled-components";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Model } from "./Model";
import { Context } from "../App";
import { isFill } from "../utilities/checkForm";
import validator from "validator";
import { clear } from "@testing-library/user-event/dist/clear";

const ShortLinkSection = styled.div`
  position: absolute;
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

  .paste-icon {
    position: absolute;
    right: 0;
    margin: 0 0.5rem;
    font-size: 22px;
    cursor: pointer;
    color: #fff;
  }

  .arrow-icon {
    margin: 0 0.5rem;
    font-size: 22px;
    transform: rotate(${(props) => props.showCustomize && "180deg"});
    transition: 0.3s;
    cursor: pointer;
  }

  .customize-section {
    transition: 0.3s;
    transform: translateY(${(props) => props.showCustomize || "-100%"});
    z-index: ${(props) => props.showCustomize || "-1"};
    height: ${(props) => props.showCustomize || "0"};
  }
`;

export const ShortLinkForm = ({ showForm, setShowForm }) => {
  const { modelDispatch, renderTrigger, setRenderTrigger, setDataListUrl } =
    useContext(Context);
  const originalUrlRef = useRef(undefined);
  const [showCustomize, setShowCustomize] = useState(false);
  const [formData, setFormData] = useState({
    originUrl: "",
    tags: "",
    type: "",
    title: "",
    description: "",
    image: "",
    url: "",
  });

  const paste = async () => {
    const pasteWord = await navigator.clipboard.readText();
    setFormData({ ...formData, originUrl: pasteWord });
  };

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
    }
  };

  const submitUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!validImage(file)) return;
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage("post", url + uploadImageRoute, formData);
    setFormData({ ...formData, url: result.imgUrl });
    console.log(result);
  };

  const isFormPass = () => {
    if (!isFill(formData.originUrl) || !validator.isURL(formData.originUrl)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "invalid url",
      });
      return false;
    } else if (
      isFill(formData.type) ||
      isFill(formData.title) ||
      isFill(formData.description) ||
      isFill(formData.url) ||
      isFill(formData.image)
    ) {
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
    }
    return true;
  };

  const rebuildForm = (data) => {
    const cleanData = { originUrl: data.originUrl };
    const og = {};
    if (isFill(formData.title) || isFill(formData.description)) {
      og.title = data.title.trim();
      og.description = data.description.trim();
      if (isFill(formData.type)) og.type = data.type.trim();
      if (isFill(formData.url)) og.url = data.url;
      if (isFill(formData.image)) og.url = data.image;
      cleanData.og = og;
    }
    return cleanData;
  };

  const createLink = async () => {
    if (!isFormPass()) return;
    const cleanData = rebuildForm(formData);
    console.log(cleanData);

    return;
    const result = await sendData("post", url + shortLinkRoute, cleanData);
    console.log(result);
    if (result.status === "success") {
      setRenderTrigger(!renderTrigger);
      setDataListUrl(`${url + shortLinkRoute}?page=1`);
      setShowForm(false);
    } else if (result.message === "短網址已存在") {
      modelDispatch({
        type: "show",
        status: "error",
        message: "url name already taken",
      });
      return false;
    }
  };

  return (
    <>
      <ShortLinkSection showForm={showForm} showCustomize={showCustomize}>
        <Container>
          <Card maxWidth="500px" mt="4rem" py="2rem">
            <CardTitle mb="2rem">CREATE NEW URL</CardTitle>
            <GroupCol mb="2rem">
              <CardSubTitle>[REQUIRED]</CardSubTitle>
              <Group items="center">
                <Input
                  type="text"
                  placeholder="Original URL"
                  style={{ paddingRight: "2rem" }}
                  ref={originalUrlRef}
                  name="originUrl"
                  value={formData.originUrl}
                  onChange={handleForm}
                />
                <MdContentPaste className="paste-icon" onClick={paste} />
              </Group>
            </GroupCol>

            <GroupCol mb="2rem">
              <CardSubTitle>[OPTIONAL]</CardSubTitle>
              <Input
                type="text"
                placeholder="Tag: #example #example2"
                mb="1rem"
                name="tags"
                value={formData.tags}
                onChange={handleForm}
              />
            </GroupCol>

            <GroupCol mb="2rem">
              <Group justify="space-between" items="center">
                <CardSubTitle>[OG : CUSTOMIZE]</CardSubTitle>
                <BsChevronDoubleDown
                  className="arrow-icon"
                  onClick={() => {
                    setShowCustomize(!showCustomize);
                  }}
                />
              </Group>
              <GroupCol className="customize-section">
                <Input
                  type="text"
                  placeholder="Title (REQUIRE)"
                  mb="1rem"
                  name="title"
                  onChange={handleForm}
                />
                <Input
                  type="text"
                  placeholder="Description (REQUIRE)"
                  mb="1rem"
                  name="description"
                  onChange={handleForm}
                />
                <Input
                  type="text"
                  placeholder="Type"
                  mb="1rem"
                  name="type"
                  onChange={handleForm}
                />
                <Input
                  type="text"
                  placeholder="Main URL"
                  mb="1rem"
                  name="url"
                  onChange={handleForm}
                />
                <Input
                  type="file"
                  placeholder="Image"
                  mb="1rem"
                  name="image"
                  onChange={submitUpload}
                />
              </GroupCol>
            </GroupCol>

            <Group justify="center" gap="1.75rem">
              <SubmitButton onClick={createLink}>CREATE</SubmitButton>
              <CancelButton
                onClick={() => {
                  setShowForm(false);
                  setShowCustomize(false);
                }}
              >
                CANCEL
              </CancelButton>
            </Group>
          </Card>
        </Container>
      </ShortLinkSection>
      <Model />
    </>
  );
};
