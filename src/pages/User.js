import { Button } from "../shared/Button";
import { Group } from "../shared/Group";
import { ShortLinkForm } from "../components/ShortLinkForm";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState } from "react";
import { url, shortLinkRoute } from "../api/routes";
import { useFetch } from "../api/api";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "../assets/icon.css";
import { JellyTriangle } from "@uiball/loaders";
import { Pagination } from "../components/Pagination";

export const User = () => {
  const [shortLink, setShortLink] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(true);
  const [dataListUrl, setDataListUrl] = useState(
    `${url + shortLinkRoute}?page=1`
  );

  const { data, isLoading } = useFetch(dataListUrl, renderTrigger);
  const shortLinkList = data?.pages?.results;
  const pageStatus = {
    currentPage: data?.pages?.page,
    totalPage: data?.pages?.totalPages,
  };

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

          <Pagination pageStatus={pageStatus} setDataListUrl={setDataListUrl} />
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
