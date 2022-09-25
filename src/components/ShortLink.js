import { useRef } from "react";
import { ShortLinkSection } from "./styles/ShortLinkSection.styled";
import { Input } from "./styles/Input.styled";
import { SubmitButton, CancelButton } from "./styles/Button.styled";
import { Group, GroupCol } from "./styles/Group.styled";
import { Container } from "./styles/Container.styled";
import { MdContentPaste } from "react-icons/md";

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
                  width: "18px",
                  height: "18px",
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
