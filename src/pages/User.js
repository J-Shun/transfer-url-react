import { Input } from "../shared/Input";
import { Button, CreateButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { ShortLink } from "../components/ShortLink";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { getShortLinkList } from "../api/api";

export const User = () => {
  const [shortLink, setShortLink] = useState(false);

  const getData = async () => {
    const result = await getShortLinkList();
    console.log(result);
  };

  return (
    <>
      <Container>
        <Group justify="space-between" mb="2rem">
          <Button>Sort By</Button>
          <Button>SHOW PAGE</Button>
        </Group>

        <Group items="center">
          <Input type="text" placeholder="Enter tags or short url" />
          <BsSearch
            style={{
              position: "absolute",
              right: "0",
              margin: "0 0.5rem",
              width: "22px",
              height: "22px",
              color: "#fff",
              cursor: "pointer",
            }}
          />
        </Group>

        <CreateButton
          onClick={() => {
            setShortLink(true);
          }}
        >
          CREATE URL
        </CreateButton>

        <br />
        <br />

        <UrlData />
        <UrlData />
        <UrlData />

        <ul style={{ paddingBottom: "3rem", display: "flex", color: "#fff" }}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>

        <button onClick={getData} style={{ color: "#000", fontSize: "2rem" }}>
          button
        </button>
      </Container>
      <ShortLink setShortLink={setShortLink} shortLink={shortLink} />
    </>
  );
};
