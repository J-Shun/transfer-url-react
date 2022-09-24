import { useRef } from "react";
import { ShortLinkSection } from "./styles/ShortLinkSection.styled";
import { Filter } from "./styles/Filter.styled";
import { Input } from "./styles/Input.styled";
import { Button, SubmitButton, CancelButton } from "./styles/Button.styled";
import { Group, GroupCol } from "./styles/Group.styled";
import { Container } from "./styles/Container.styled";

export const ShortLink = () => {
  let pasteRef = useRef(undefined);
  const paste = () => {
    console.log("paste");
  };

  return (
    <Filter>
      <Container>
        <ShortLinkSection>
          <h2>CREATE NEW URL</h2>
          <GroupCol>
            <h3>[REQUIRED]</h3>
            <Group>
              <Input type="text" placeholder="Enter Original URL" />
              <Button ref={pasteRef} onClick={paste}>
                PASTE
              </Button>
            </Group>
          </GroupCol>

          <GroupCol>
            <h3>[OPTIONAL]</h3>
            <Input placeholder="Enter TAG : #example #example2"></Input>
            <Input placeholder="Short URL Name"></Input>
            <Button>IMAGE</Button>
          </GroupCol>

          <GroupCol>
            <h3>[CUSTOMIZE]</h3>
            <Input placeholder="OG"></Input>
            <Input placeholder="META"></Input>
            <Input placeholder="IMAGE"></Input>
          </GroupCol>

          <Group center gap="2rem">
            <CancelButton>CANCEL</CancelButton>
            <SubmitButton>CREATE</SubmitButton>
          </Group>
        </ShortLinkSection>
      </Container>
    </Filter>
  );
};
