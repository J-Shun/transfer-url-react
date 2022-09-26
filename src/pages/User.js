import { Input } from "../components/styles/Input.styled";
import { Button, CreateButton } from "../components/styles/Button.styled";
import { Group } from "../components/styles/Group.styled";
import { ShortLink } from "../components/ShortLink";
import { UrlData } from "../components/UrlData";
import { Container } from "../components/styles/Container.styled";
import { Header } from "../components/Header";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Outlet } from "react-router-dom";

export const User = () => {
  const [shortLink, setShortLink] = useState(false);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Container>
        <div style={{ paddingTop: "6rem" }}></div>

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

        <ul style={{ paddingBottom: "3rem", display: "flex" }}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </Container>
      <ShortLink setShortLink={setShortLink} shortLink={shortLink} /> */}
    </>
  );
};
