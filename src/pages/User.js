import { Group } from "../shared/Group";
import { ShortLinkForm } from "../components/ShortLinkForm";
import { UrlData } from "../components/UrlData";
import { Container } from "../shared/Container";
import { useState, useContext } from "react";
import { Context } from "../App";
import { useFetch } from "../api/api";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Pagination } from "../components/Pagination";
import { Navigate } from "react-router-dom";
import { Select, Option } from "../shared/Input";
import { Empty } from "../components/Empty";
import { PageLoading, ApiLoading } from "../components/Loading";
import styled from "styled-components";

const UserSection = styled.div`
  .create-btn {
    position: fixed;
    right: 2.5rem;
    bottom: 2.5rem;
    color: #fcee0a;
    background-color: #000;
    cursor: pointer;
    font-size: 3.5rem;
    z-index: 2;
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      color: #fff;
    }
  }

  .block {
    margin-top: 8rem;
  }
`;

export const User = () => {
  const { dataListUrl, renderTrigger, callApi } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useFetch(dataListUrl, renderTrigger);
  console.log(data);

  const shortLinkList = data.pages?.results;
  const pageStatus = {
    currentPage: data.pages?.page,
    totalPage: data.pages?.totalPages,
  };

  if (isLoading) return <PageLoading />;
  if (data.status !== "success") return <Navigate to="/" />;

  return (
    <UserSection>
      <Container>
        <div className="block"></div>
        <Group justify="space-between" mb="4rem">
          <Select width={"200px"}>
            <Option>Created Time</Option>
            <Option>Clicks</Option>
          </Select>
        </Group>

        <BsFillPlusCircleFill
          className="create-btn"
          onClick={() => {
            setShowForm(true);
          }}
        />

        {shortLinkList.map((linkData) => {
          return <UrlData key={linkData._id} data={linkData} />;
        })}

        <Pagination pageStatus={pageStatus} />
      </Container>

      {callApi && <ApiLoading />}

      {shortLinkList.length < 1 && <Empty />}
      <ShortLinkForm showForm={showForm} setShowForm={setShowForm} />
    </UserSection>
  );
};
