import { useState, useRef, useContext } from "react";
import { Context } from "../App";
import { sendData, uploadImage } from "../api/api";
import { url, shortLinkRoute, uploadImageRoute } from "../api/routes";
import { Model } from "./Model";
import { Label, Input, Select, Option } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { MdContentPaste } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { BsChevronDoubleDown } from "react-icons/bs";
import { toArray } from "../utilities/toArray";
import { isFill } from "../utilities/checkForm";
import validator from "validator";
import styled from "styled-components";

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

  .paste-btn {
    position: absolute;
    right: 0;
    margin: 0 0.5rem;
    font-size: 22px;
    cursor: pointer;
    color: #fff;
  }

  .arrow-btn {
    margin: 0 0.5rem;
    font-size: 22px;
    transform: rotate(${(props) => props.showCustomize && "180deg"});
    transition: 0.3s;
    cursor: pointer;
  }

  .cancel-btn {
    position: absolute;
    right: 0;
    font-size: 1.75rem;
    cursor: pointer;
    color: #e23832;
  }

  .customize-section {
    transition: 0.3s;
    transform: translateY(${(props) => props.showCustomize || "-100%"});
    z-index: ${(props) => props.showCustomize || "-1"};
    height: ${(props) => props.showCustomize || "0"};
  }
`;

export const ShortLinkForm = ({ showForm, setShowForm }) => {
  const {
    modelDispatch,
    renderTrigger,
    setRenderTrigger,
    setDataListUrl,
    setCallApi,
  } = useContext(Context);
  const originalUrlRef = useRef(undefined);
  const [showCustomize, setShowCustomize] = useState(false);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [formData, setFormData] = useState({
    originUrl: "",
    tags: "",
    type: "",
    title: "",
    description: "",
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
    if (e.target.files[0] === undefined) return;
    const file = e.target.files[0];
    if (!validImage(file)) return;
    const formData = new FormData();
    formData.append("file", file);

    setCallApi(true);
    const result = await uploadImage("post", url + uploadImageRoute, formData);
    setCallApi(false);

    setImage(result.imgUrl);
    setImageName(file.name);
  };

  const cancelImage = () => {
    setImageName("");
    setImage("");
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
      isFill(image)
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
      if (isFill(formData.type)) og.type = data.type;
      if (isFill(formData.url)) og.url = data.url;
      if (isFill(image)) og.image = image;
      cleanData.og = og;
    }
    if (isFill(formData.tags)) {
      const tags = toArray(formData.tags);
      cleanData.tags = tags;
    }
    return cleanData;
  };

  const createLink = async () => {
    if (!isFormPass()) return;
    const cleanData = rebuildForm(formData);

    setCallApi(true);
    const result = await sendData("post", url + shortLinkRoute, cleanData);
    setCallApi(false);

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
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "server error",
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
              <CardSubTitle>REQUIRED</CardSubTitle>
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
                <MdContentPaste className="paste-btn" onClick={paste} />
              </Group>
            </GroupCol>

            <GroupCol mb="2rem">
              <CardSubTitle>OPTIONAL</CardSubTitle>
              <Input
                type="text"
                placeholder="Tag: tag1 tag2"
                mb="1rem"
                name="tags"
                value={formData.tags}
                onChange={handleForm}
              />
            </GroupCol>

            <GroupCol mb="2rem">
              <Group justify="space-between" items="center">
                <CardSubTitle>OG : CUSTOMIZE</CardSubTitle>
                <BsChevronDoubleDown
                  className="arrow-btn"
                  onClick={() => {
                    setShowCustomize(!showCustomize);
                  }}
                />
              </Group>
              <GroupCol className="customize-section">
                <GroupCol mb="1rem">
                  <Select name="type" onChange={handleForm}>
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
                    className="cancel-btn"
                    onClick={cancelImage}
                  />
                </Group>
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
