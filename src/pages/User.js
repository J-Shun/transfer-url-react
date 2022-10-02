import { Group } from "../shared/Group";
import { ShortLinkForm } from "../components/ShortLinkForm";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState, useContext } from "react";
import { Context } from "../App";
import { useFetch } from "../api/api";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "../assets/icon.css";
import { JellyTriangle } from "@uiball/loaders";
import { Pagination } from "../components/Pagination";
import { Navigate } from "react-router-dom";
import { Select, Option } from "../shared/Input";

export const User = () => {
  const { dataListUrl, renderTrigger } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
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
  } else if (data?.status !== "success") {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <Container>
          <div style={{ marginTop: "8rem" }}></div>
          <Group justify="space-between" mb="4rem">
            <Select width={"200px"}>
              <Option>Created Time</Option>
              <Option>Clicks</Option>
            </Select>
          </Group>

          <BsFillPlusCircleFill
            className="create-icon"
            onClick={() => {
              setShowForm(true);
            }}
          />

          {shortLinkList.map((linkData) => {
            return <UrlData key={linkData._id} data={linkData} />;
          })}

          <Pagination pageStatus={pageStatus} />
        </Container>
        <ShortLinkForm showForm={showForm} setShowForm={setShowForm} />
      </>
    );
  }
};
