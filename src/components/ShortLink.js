import { useRef } from "react";
import { Input } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle, CardSubTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { MdContentPaste } from "react-icons/md";
import { useState } from "react";
import { sendData } from "../api/api";
import { createShortLinkRoute } from "../api/routes";
import styled from "styled-components";

const ShortLinkSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  background-color: #000;
  opacity: 0.9;
  transition: 0.5s;
  transform: ${(props) =>
    props.shortLink ? "translateX(0)" : "translateX(-100%)"};
`;

export const ShortLink = ({ setShortLink, shortLink }) => {
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
  const originalUrlRef = useRef(undefined);

  const paste = async () => {
    const pasteWord = await navigator.clipboard.readText();
    setFormData({ ...formData, originUrl: pasteWord });
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createLink = async () => {
    console.log(formData);
    const result = await sendData("post", createShortLinkRoute, formData);
    console.log(result);
  };

  return (
    <ShortLinkSection shortLink={shortLink}>
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
              <MdContentPaste
                style={{
                  position: "absolute",
                  right: "0",
                  margin: "0 0.5rem",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={paste}
              />
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
            <CardSubTitle>[OG : CUSTOMIZE]</CardSubTitle>
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

          <Group justify="center" gap="2rem" mb="2rem">
            <SubmitButton onClick={createLink}>CREATE</SubmitButton>
            <CancelButton
              onClick={() => {
                setShortLink(false);
              }}
            >
              CANCEL
            </CancelButton>
          </Group>
        </Card>
      </Container>
    </ShortLinkSection>
  );
};
