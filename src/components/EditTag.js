import { TextArea } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { Container } from "../shared/Container";
import { CardTitle } from "../shared/Text";
import { Card } from "../shared/Card";
import { useState, useContext } from "react";
import { sendData } from "../api/api";
import { url, shortLinkRoute } from "../api/routes";
import styled from "styled-components";
import { Context } from "../App";
import { toArray } from "../utilities/toArray";

const TagSection = styled.div`
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

export const EditTag = ({ showTagForm, setShowTagForm, tags, id }) => {
  const {
    modelDispatch,
    renderTrigger,
    setRenderTrigger,
    setDataListUrl,
    setCallApi,
  } = useContext(Context);

  const tagsString = tags.join(" ");
  const [tagStatus, setTagStatus] = useState(tagsString);

  const handleLogin = (e) => {
    setTagStatus(e.target.value);
  };

  const sendTagStatus = async () => {
    const cleanData = {};
    const tagArray = toArray(tagStatus);
    cleanData.tags = tagArray;

    setCallApi(true);
    const result = await sendData(
      "post",
      `${url + shortLinkRoute}/${id}/tags`,
      cleanData
    );
    setCallApi(false);

    if (result.status === "success") {
      setRenderTrigger(!renderTrigger);
      setDataListUrl(`${url + shortLinkRoute}?page=1`);
      setShowTagForm(false);
    } else {
      modelDispatch({
        type: "show",
        status: "error",
        message: "server error",
      });
    }
  };

  return (
    <>
      <TagSection showForm={showTagForm}>
        <Container>
          <Card maxWidth="500px" mt="4rem" py="2rem">
            <CardTitle mb="2rem">Tag Edit</CardTitle>

            <TextArea
              mb="3rem"
              placeholder="Tag: tag1 tag2"
              value={tagStatus}
              onChange={handleLogin}
            />

            <Group justify="center" gap="1.75rem">
              <SubmitButton onClick={sendTagStatus}>CREATE</SubmitButton>
              <CancelButton
                onClick={() => {
                  setShowTagForm(false);
                }}
              >
                CANCEL
              </CancelButton>
            </Group>
          </Card>
        </Container>
      </TagSection>
    </>
  );
};
