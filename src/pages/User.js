import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { Group } from "../shared/Group";
import { ShortLinkForm } from "../components/ShortLinkForm";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { url, getShortLinkList } from "../api/routes";
import { useFetch } from "../api/api";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "../assets/icon.css";
import { JellyTriangle } from "@uiball/loaders";

export const User = () => {
  const [shortLink, setShortLink] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(true);

  const { data, isLoading } = useFetch(url + getShortLinkList, renderTrigger);
  const shortLinkList = data?.pages?.results;

  if (isLoading) {
    return (
      <div className="icon-background">
        <JellyTriangle size={60} speed={1.75} color="#fcee0a" />;
      </div>
    );
  } else {
    return (
      <>
        <Container>
          <div style={{ marginTop: "4rem" }}></div>
          <Group justify="space-between" mb="2rem">
            <Button>Sort By</Button>
            <Button>SHOW PAGE</Button>
          </Group>

          <Group items="center">
            <Input type="text" placeholder="Enter tags or short url" />
            <BsSearch className="search-icon" />
          </Group>

          <BsFillPlusCircleFill
            className="create-icon"
            onClick={() => {
              setShortLink(true);
            }}
          />

          <br />
          <br />

          {shortLinkList.map((linkData) => {
            return (
              <UrlData
                key={linkData._id}
                data={linkData}
                renderTrigger={renderTrigger}
                setRenderTrigger={setRenderTrigger}
              />
            );
          })}

          <ul style={{ paddingBottom: "3rem", display: "flex", color: "#fff" }}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </Container>
        <ShortLinkForm
          setShortLink={setShortLink}
          shortLink={shortLink}
          renderTrigger={renderTrigger}
          setRenderTrigger={setRenderTrigger}
        />
      </>
    );
  }
};
