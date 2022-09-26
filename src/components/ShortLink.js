import { useRef } from "react";
import { Input } from "../shared/Input";
import { SubmitButton, CancelButton } from "../shared/Button";
import { Group, GroupCol } from "../shared/Group";
import { Container } from "../shared/Container";
import { MdContentPaste } from "react-icons/md";

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

  .shortLink-card {
    max-width: 500px;
    border: 2px solid #fff;
    padding: 0 1rem;
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    color: #fff;
  }

  .shortLink-title {
    font-size: 2rem;
    font-style: italic;
    text-align: center;
    color: #fcee0a;
    background-color: #000;
    padding: 0.25rem;
    transform: translateY(-50%);
  }

  .shortLink-subtitle {
    color: #fcee0a;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

export const ShortLink = ({ setShortLink, shortLink }) => {
  const originalUrlRef = useRef(undefined);

  const paste = async () => {
    const pasteWord = await navigator.clipboard.readText();
    originalUrlRef.current.value = pasteWord;
  };

  return (
    <ShortLinkSection shortLink={shortLink}>
      <Container>
        <div className="shortLink-card">
          <h2 className="shortLink-title">CREATE NEW URL</h2>
          <GroupCol mb="2rem">
            <h3 className="shortLink-subtitle">[REQUIRED]</h3>
            <Group items="center">
              <Input
                type="text"
                placeholder="Original URL"
                style={{ paddingRight: "2rem" }}
                ref={originalUrlRef}
              />
              <MdContentPaste
                style={{
                  position: "absolute",
                  right: "0",
                  margin: "0 0.5rem",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                }}
                onClick={paste}
              />
            </Group>
          </GroupCol>

          <GroupCol mb="2rem">
            <h3 className="shortLink-subtitle">[OPTIONAL]</h3>
            <Input
              type="text"
              placeholder="TAG: #example #example2"
              mb="1rem"
            />
            <Input type="text" placeholder="Short URL Name" />
          </GroupCol>

          <GroupCol mb="2rem">
            <h3 className="shortLink-subtitle">[CUSTOMIZE]</h3>
            <Input type="text" placeholder="OG" mb="1rem"></Input>
            <Input type="text" placeholder="META" mb="1rem"></Input>
            <Input type="text" placeholder="IMAGE" mb="1rem"></Input>
          </GroupCol>

          <Group justify="center" gap="2rem" mb="2rem">
            <SubmitButton>CREATE</SubmitButton>
            <CancelButton
              onClick={() => {
                setShortLink(false);
              }}
            >
              CANCEL
            </CancelButton>
          </Group>
        </div>
      </Container>
    </ShortLinkSection>
  );
};
