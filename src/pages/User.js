import { Input } from "../shared/Input";
import { Button, CreateButton } from "../shared/Button";
import { Group } from "../shared/Group";
import { ShortLink } from "../components/ShortLink";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { url, getShortLinkList } from "../api/routes";

import { useFetch } from "../api/api";

export const User = () => {
  const [shortLink, setShortLink] = useState(false);

  const { data, isLoading } = useFetch(url + getShortLinkList);
  const shortLinkList = data?.pages?.results;

  if (isLoading) {
    return <h1 style={{ color: "#fff" }}>Loading</h1>;
  } else {
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

          {shortLinkList.map((linkData) => {
            return <UrlData key={linkData._id} data={linkData} />;
          })}

          <ul style={{ paddingBottom: "3rem", display: "flex", color: "#fff" }}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </Container>
        <ShortLink setShortLink={setShortLink} shortLink={shortLink} />
      </>
    );
  }
};
