import { useRef } from "react";
import { Input } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { MdContentPaste } from "react-icons/md";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { url, shortLinkRoute } from "../api/routes";
import styled from "styled-components";
import { BsChevronDoubleDown } from "react-icons/bs";
import { Model } from "./Model";
import { Context } from "../App";
import { isFill } from "../utilities/checkForm";

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
  opacity: 0.9;
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

export const ShortLinkForm = ({
  showForm,
  setShowForm,
  renderTrigger,
  setRenderTrigger,
}) => {
  const { modelDispatch } = useContext(Context);
  const originalUrlRef = useRef(undefined);
  const [showCustomize, setShowCustomize] = useState(false);
  const [formData, setFormData] = useState({
    originUrl: "",
    tags: "",
    shortUrl: "",
    type: "",
    title: "",
    description: "",
    url: "",
    image: "",
  });

  const paste = async () => {
    const pasteWord = await navigator.clipboard.readText();
    setFormData({ ...formData, originUrl: pasteWord });
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormPass = () => {
    if (!isFill(formData.originUrl)) {
      modelDispatch({
        type: "show",
        status: "error",
        message: "require url",
      });
      return false;
    }
    return true;
  };

  const createLink = async () => {
    if (!isFormPass()) return;
    const result = await sendData("post", url + shortLinkRoute, formData);
    console.log(result);
    if (result.status === "success") {
      setRenderTrigger(!renderTrigger);
      setShowForm(false);
    }
  };

  return (
    <ShortLinkSection showForm={showForm} showCustomize={showCustomize}>
      <Container>
        <Card maxWidth="500px" mt="4rem" py="0">
          <CardTitle bgColor="#000" translateY="translateY(-50%)">
            CREATE NEW URL
          </CardTitle>
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
              placeholder="TAG: #example #example2"
              mb="1rem"
              name="tags"
              onChange={handleForm}
            />
            <Input
              type="text"
              placeholder="Short URL Name"
              name="shortUrl"
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
                placeholder="TYPE"
                mb="1rem"
                name="type"
                onChange={handleForm}
              />
              <Input
                type="text"
                placeholder="TITLE"
                mb="1rem"
                name="title"
                onChange={handleForm}
              />
              <Input
                type="text"
                placeholder="DESCRIPTION"
                mb="1rem"
                name="description"
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
                type="text"
                placeholder="IMAGE"
                mb="1rem"
                name="image"
                onChange={handleForm}
              />
            </GroupCol>
          </GroupCol>

          <Group justify="center" gap="2rem" mb="2rem">
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
      <Model />
    </ShortLinkSection>
  );
};
